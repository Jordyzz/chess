import React, { useEffect, useMemo, useCallback } from 'react';

import styles from './GameBoard.scss';
import Square from './Square';
import { useSelector } from '@redux/useSelector';
import { gameService } from '@core/GameService';
import { dispatch } from '@src/redux/store';
import { setSelectedPiece } from '@src/redux/game';
import { Piece } from '@core/Pieces/Piece';
import PromotionMenu from '@components/PromotionMenu';

const GameBoard = () => {
  const { board, selectedPiece, currentTurn, isCheckmate, isPromotion, player } = useSelector(
    state => state.game
  );

  useEffect(() => {
    gameService.initBoard();
  }, []);

  const possiblesMoves = useMemo(
    () =>
      selectedPiece &&
      gameService.filterCheckMoves(selectedPiece, selectedPiece.getPossibleMoves(board)),
    [selectedPiece, board]
  );

  const isLight = (idx: number) => {
    if (idx < 8 && idx % 2 == 0) return true;

    if (Math.floor(idx / 8) % 2 == 0 && idx % 2 == 0) return true;

    if (Math.floor(idx / 8) % 2 !== 0 && idx % 2 !== 0) return true;
  };

  const squareOnClick = useCallback(
    (piece: Piece, index) => {
      if (isCheckmate || isPromotion || currentTurn !== player.id) return;

      selectedPiece
        ? possiblesMoves.includes(index)
          ? gameService.movePiece(index, player)
          : gameService.clearSelection()
        : piece &&
          currentTurn === piece.player &&
          piece.getPossibleMoves(board).length > 0 &&
          dispatch(setSelectedPiece(piece));
    },
    [selectedPiece, possiblesMoves, currentTurn, isCheckmate, isPromotion, player, board]
  );

  const promotionOnClick = useCallback((promotionPiece: string) => {
    gameService.setPromotedPawn(promotionPiece);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.gameContainer}>
        {board.map((square, idx) => (
          <Square
            key={idx}
            index={idx}
            isLight={isLight(idx)}
            piece={square}
            isColored={possiblesMoves && possiblesMoves.includes(idx)}
            setSelected={squareOnClick}
          />
        ))}
      </div>
      {isPromotion && (
        <PromotionMenu currentTurn={currentTurn} onSelectedPromotion={promotionOnClick} />
      )}
    </div>
  );
};

export default GameBoard;
