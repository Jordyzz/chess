import { Piece } from './Piece';
import { getState } from '@src/redux/store';

export class Bishop extends Piece {
  constructor(player) {
    super(player, 4);
    this.pieceId = 4;
  }

  getPossibleMoves(idx) {
    const { board } = getState().game;
    const possibleMoves = [];

    for (
      let i = idx - 7, j = idx, resume = true;
      Math.abs(Math.floor(i / 8) - Math.floor(j / 8)) === 1 && resume;
      i -= 7, j -= 7
    )
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (
      let i = idx + 7, j = idx, resume = true;
      Math.abs(Math.floor(i / 8) - Math.floor(j / 8)) === 1 && resume;
      i += 7, j += 7
    )
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (
      let i = idx + 9, j = idx, resume = true;
      Math.abs(Math.floor(i / 8) - Math.floor(j / 8)) === 1 && resume;
      i += 9, j += 9
    )
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (
      let i = idx - 9, j = idx, resume = true;
      Math.abs(Math.floor(i / 8) - Math.floor(j / 8)) === 1 && resume;
      i -= 9, j -= 9
    )
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    return possibleMoves;
  }
}
