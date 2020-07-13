import { Piece } from './Piece';
import { getState } from '@src/redux/store';

export class Pawn extends Piece {
  constructor(player) {
    super(player, 1);
    this.pieceId = 1;
  }

  getPossibleMoves(idx) {
    const { board } = getState().game;
    const possibleMoves = [];

    return possibleMoves;
  }

  isInitialPos(idx) {
    return this.player == 1 ? Math.floor(idx / 8) == 6 : Math.floor(idx / 8) == 2;
  }

  canPawnEat(idx, board): Array<number> {
    const eatPossibilities = [];

    board[idx];

    return eatPossibilities;
  }
}
