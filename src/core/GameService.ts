import { dispatch, getState } from '@redux/store';
import {
  updateBoard,
  setSelectedPiece,
  clearSelection,
  toggleTurn,
  initPlayersPieces,
  pieceToGraveyard,
  checkmate,
  togglePromotion,
  updatePieces
} from '@redux/game';
import { pieceFactory } from './Pieces/PieceFactory';
import { Rook } from './Pieces/Rook';
import { King } from './Pieces/King';
import { Piece } from './Pieces/Piece';

class GameService {
  initBoard() {
    const gameArr = Array(64).fill(null);
    const playerOnePieces = [];
    const playerTwoPieces = [];

    for (let i = 8; i < 16; i++) {
      gameArr[i + 40] = pieceFactory.createPiece('Pawn', 1, i + 40);
      gameArr[i] = pieceFactory.createPiece('Pawn', 2, i);
      playerOnePieces.push(gameArr[i + 40]);
      playerTwoPieces.push(gameArr[i]);
    }

    gameArr[56] = pieceFactory.createPiece('Rook', 1, 56);
    gameArr[63] = pieceFactory.createPiece('Rook', 1, 63);
    gameArr[57] = pieceFactory.createPiece('Knight', 1, 57);
    gameArr[62] = pieceFactory.createPiece('Knight', 1, 62);
    gameArr[58] = pieceFactory.createPiece('Bishop', 1, 58);
    gameArr[61] = pieceFactory.createPiece('Bishop', 1, 61);
    gameArr[59] = pieceFactory.createPiece('Queen', 1, 59);
    gameArr[60] = pieceFactory.createPiece('King', 1, 60);

    playerOnePieces.push(
      gameArr[56],
      gameArr[63],
      gameArr[57],
      gameArr[62],
      gameArr[58],
      gameArr[61],
      gameArr[59],
      gameArr[60]
    );

    gameArr[0] = pieceFactory.createPiece('Rook', 2, 0);
    gameArr[7] = pieceFactory.createPiece('Rook', 2, 7);
    gameArr[1] = pieceFactory.createPiece('Knight', 2, 1);
    gameArr[6] = pieceFactory.createPiece('Knight', 2, 6);
    gameArr[5] = pieceFactory.createPiece('Bishop', 2, 5);
    gameArr[2] = pieceFactory.createPiece('Bishop', 2, 2);
    gameArr[3] = pieceFactory.createPiece('Queen', 2, 3);
    gameArr[4] = pieceFactory.createPiece('King', 2, 4);

    playerTwoPieces.push(
      gameArr[0],
      gameArr[7],
      gameArr[1],
      gameArr[6],
      gameArr[5],
      gameArr[2],
      gameArr[3],
      gameArr[4]
    );

    dispatch(initPlayersPieces({ player1: playerOnePieces, player2: playerTwoPieces }));
    dispatch(updateBoard(gameArr));
  }

  updateSelectedPiece(piece: Piece) {
    dispatch(setSelectedPiece(piece));
  }

  clearSelection() {
    dispatch(clearSelection());
  }

  movePiece(newPos: number) {
    const { board, selectedPiece } = getState().game;

    if (board[newPos]) {
      board[newPos].position = -1;
      dispatch(pieceToGraveyard(board[newPos]));
    }

    if (selectedPiece.pieceId === 6 && Math.abs(newPos - selectedPiece.position) === 2)
      this.castleMove(newPos, selectedPiece.position, board);

    board[newPos] = selectedPiece;
    board[selectedPiece.position] = null;
    selectedPiece.position = newPos;

    if (selectedPiece.pieceId === 6 || selectedPiece.pieceId === 2)
      (selectedPiece as Rook | King).dirty = true;

    dispatch(updateBoard(board));

    if (!this.isPawnPromotion(selectedPiece)) {
      this.clearSelection();
      dispatch(toggleTurn());
      this.isCheckmate(board);
    }
  }

  isPawnPromotion(selectedPiece: Piece) {
    const promotionIdx = [0, 7];
    if (
      selectedPiece.pieceId === 1 &&
      promotionIdx.includes(Math.floor(selectedPiece.position / 8))
    ) {
      dispatch(togglePromotion());
      return true;
    }

    return false;
  }

  setPromotedPawn(promotedPiece: string) {
    const { board, selectedPiece, currentTurn } = getState().game;

    const newPiece = pieceFactory.createPiece(promotedPiece, currentTurn, selectedPiece.position);
    const playerPieces = getState().game[`player${currentTurn}`].alive;
    const newPlayerPieces = playerPieces.filter(p => p !== selectedPiece).concat(newPiece);
    board[selectedPiece.position] = newPiece;

    dispatch(updatePieces({ player: `player${currentTurn}`, pieces: newPlayerPieces }));
    this.clearSelection();
    dispatch(togglePromotion());
    dispatch(toggleTurn());
    this.isCheckmate(board);
  }

  castleMove(newPos, piecePos, board) {
    if (newPos > piecePos) {
      board[piecePos + 1] = board[piecePos + 3];
      board[piecePos + 1].position = board[piecePos + 1].position - 2;
      board[piecePos + 3] = null;
    } else {
      board[piecePos - 1] = board[piecePos - 4];
      board[piecePos - 1].position = board[piecePos - 1].position + 3;
      board[piecePos - 4] = null;
    }
  }

  filterCheckMoves(piece: Piece, possibleMoves: Array<number>) {
    const { board } = getState().game;
    const opponentPlayer = piece.player === 1 ? 'player2' : 'player1';
    const opponentPieces = getState().game[opponentPlayer].alive;
    const playerKing = getState().game[`player${piece.player}`].alive.find(p => p.pieceId === 6);

    const newMoves = possibleMoves.filter(newPos => {
      const newBoard = [...board];
      const possibleEat = newBoard[newPos];

      newBoard[newPos] = piece;
      newBoard[piece.position] = null;

      return !opponentPieces
        .filter(p => p !== possibleEat)
        .find(pi =>
          pi.getPossibleMoves(newBoard).includes(piece.pieceId === 6 ? newPos : playerKing.position)
        );
    });

    return newMoves;
  }

  isCheckmate(board: Array<Piece>) {
    const { currentTurn } = getState().game;
    const playerKey = `player${currentTurn}`;
    const currentPlayerPieces: Array<Piece> = getState().game[playerKey].alive;
    const possibleMoves = [];

    currentPlayerPieces.map(p =>
      possibleMoves.push(...this.filterCheckMoves(p, p.getPossibleMoves(board)))
    );

    possibleMoves.length === 0 && dispatch(checkmate());
  }
}

export const gameService = new GameService();
