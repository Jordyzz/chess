import { Piece } from './Piece';
import { getState } from '@src/redux/store';

export class Queen extends Piece {
  constructor(player) {
    super(player, 5);
    this.pieceId = 5;
  }

  getPossibleMoves(idx) {
    const { board } = getState().game;
    const possibleMoves = [];

    for (let i = idx - 7, j = idx, resume = true; this.isCrossMove(i, j) && resume; i -= 7, j -= 7)
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (let i = idx + 7, j = idx, resume = true; this.isCrossMove(i, j) && resume; i += 7, j += 7)
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (let i = idx + 9, j = idx, resume = true; this.isCrossMove(i, j) && resume; i += 9, j += 9)
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (let i = idx - 9, j = idx, resume = true; this.isCrossMove(i, j) && resume; i -= 9, j -= 9)
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (let i = idx - 8, resume = true; i / 8 > 0 && resume; i -= 8) {
      resume = this.addMoveIndex(idx, i, board, possibleMoves);
    }

    for (let i = idx + 8, resume = true; i < 64 && resume; i += 8) {
      resume = this.addMoveIndex(idx, i, board, possibleMoves);
    }

    for (let i = idx - 1, resume = true; this.isSameRowMove(i, idx) && resume; i--)
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    for (let i = idx + 1, resume = true; this.isSameRowMove(i, idx) && resume; i++)
      resume = this.addMoveIndex(idx, i, board, possibleMoves);

    return possibleMoves;
  }
}
