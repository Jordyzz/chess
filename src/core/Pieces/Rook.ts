import { Piece } from './Piece';
import { getState } from '@src/redux/store';

export class Rook extends Piece {
  constructor(player) {
    super(player, 2);
    this.pieceId = 2;
  }

  getPossibleMoves(idx) {
    const { board } = getState().game;
    const possibleMoves = [];

    for (let i = idx - 8, resume = true; i / 8 > 0 && resume; i -= 8) {
      resume = this.addMoveIndex(idx, i, board, possibleMoves);
    }

    for (let i = idx + 8, resume = true; i < 64 && resume; i += 8) {
      resume = this.addMoveIndex(idx, i, board, possibleMoves);
    }

    for (
      let i = idx - 1, resume = true;
      Math.floor(i / 8) % 2 === Math.floor(idx / 8) % 2 && resume;
      i--
    )
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (
      let i = idx + 1, resume = true;
      Math.floor(i / 8) % 2 === Math.floor(idx / 8) % 2 && resume;
      i++
    )
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    return possibleMoves;
  }
}
