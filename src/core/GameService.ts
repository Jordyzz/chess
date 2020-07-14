import { dispatch, getState } from '@redux/store';
import { updateBoard, setSelectedPiece } from '@redux/game';
import { Rook } from './Pieces/Rook';
import { Queen } from './Pieces/Queen';
import { King } from './Pieces/King';
import { Bishop } from './Pieces/Bishop';
import { Pawn } from './Pieces/Pawn';
import { Knight } from './Pieces/Knight';

class GameService {
  initBoard() {
    const gameArr = Array(64).fill(null);

    for (let i = 8; i < 16; i++) {
      gameArr[i + 40] = new Pawn(1);
      gameArr[i] = new Pawn(2);
    }

    gameArr[56] = new Rook(1);
    gameArr[63] = new Rook(1);
    gameArr[57] = new Knight(1);
    gameArr[62] = new Knight(1);
    gameArr[58] = new Bishop(1);
    gameArr[61] = new Bishop(1);
    gameArr[59] = new Queen(1);
    gameArr[60] = new King(1);

    gameArr[0] = new Rook(2);
    gameArr[7] = new Rook(2);
    gameArr[1] = new Knight(2);
    gameArr[6] = new Knight(2);
    gameArr[5] = new Bishop(2);
    gameArr[2] = new Bishop(2);
    gameArr[3] = new Queen(2);
    gameArr[4] = new King(2);

    gameArr[32] = new King(1);

    dispatch(updateBoard(gameArr));
  }

  updateSelectedPiece(piece) {
    dispatch(setSelectedPiece(piece));
  }
}

export const gameService = new GameService();
