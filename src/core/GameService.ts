import { dispatch } from '@src/redux/store';
import { updateBoard } from '@redux/game';
import { Rook } from './Pieces/Rook';
import { Queen } from './Pieces/Queen';
import { King } from './Pieces/King';
import { Bishop } from './Pieces/Bishop';
import { Pawn } from './Pieces/Pawn';
import { Knight } from './Pieces/Knight';

class GameService {
  initBoard() {
    let counter = 0;
    const gameArr = Array.from(Array(8), () => new Array(8).fill(null));
    gameArr.map((c, cIdx) => {
      return c.map((r, rIdx) => {
        gameArr[cIdx][rIdx] = { index: counter, piece: null };
        counter++;
      });
    });

    for (let i = 0; i < 8; i++) {
      gameArr[6][i].piece = new Pawn(1);
      gameArr[1][i].piece = new Pawn(2);
    }

    gameArr[7][0].piece = new Rook(1);
    gameArr[7][7].piece = new Rook(1);
    gameArr[7][1].piece = new Knight(1);
    gameArr[7][6].piece = new Knight(1);
    gameArr[7][5].piece = new Bishop(1);
    gameArr[7][2].piece = new Bishop(1);
    gameArr[7][3].piece = new Queen(1);
    gameArr[7][4].piece = new King(1);

    gameArr[0][0].piece = new Rook(2);
    gameArr[0][7].piece = new Rook(2);
    gameArr[0][1].piece = new Knight(2);
    gameArr[0][6].piece = new Knight(2);
    gameArr[0][5].piece = new Bishop(2);
    gameArr[0][2].piece = new Bishop(2);
    gameArr[0][3].piece = new Queen(2);
    gameArr[0][4].piece = new King(2);

    dispatch(updateBoard(gameArr));
  }
}

export const gameService = new GameService();
