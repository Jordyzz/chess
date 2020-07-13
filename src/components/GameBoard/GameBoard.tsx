import React, { useEffect } from 'react';

import styles from './GameBoard.scss';
import Square from './Square';
import { useSelector } from '@redux/useSelector';
import { gameService } from '@core/GameService';

const GameBoard = () => {
  const { board, selectedPiece } = useSelector(state => state.game);

  useEffect(() => {
    gameService.initBoard();
  }, []);

  const isLight = (idx: number) => {
    if (idx < 8 && idx % 2 == 0) return true;

    if (Math.floor(idx / 8) % 2 == 0 && idx % 2 == 0) return true;

    if (Math.floor(idx / 8) % 2 !== 0 && idx % 2 !== 0) return true;
  };

  console.log(selectedPiece && selectedPiece.getPossibleMoves(35));

  return (
    <div className={styles.wrapper}>
      {board.map((square, idx) => (
        <Square
          key={idx}
          index={idx}
          isLight={isLight(idx)}
          piece={square}
          color={null}
          setSelected={gameService.updateSelectedPiece}
        />
      ))}
    </div>
  );
};

export default GameBoard;
