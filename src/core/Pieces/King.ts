import { Piece } from './Piece';
import { getState } from '@src/redux/store';

export class King extends Piece {
  constructor(player) {
    super(player, 6);
    this.pieceId = 6;
  }

  getPossibleMoves(idx) {
    const { board } = getState().game;
    const possibleMoves = [];

    this.isSameRowMove(idx, idx - 1) && this.addMoveIndex(idx, idx - 1, board, possibleMoves);
    this.isSameRowMove(idx, idx + 1) && this.addMoveIndex(idx, idx + 1, board, possibleMoves);
    this.isCrossMove(idx, idx - 7) && this.addMoveIndex(idx, idx - 7, board, possibleMoves);
    this.isCrossMove(idx, idx + 7) && this.addMoveIndex(idx, idx + 7, board, possibleMoves);
    this.isCrossMove(idx, idx - 9) && this.addMoveIndex(idx, idx - 9, board, possibleMoves);
    this.isCrossMove(idx, idx + 9) && this.addMoveIndex(idx, idx + 9, board, possibleMoves);
    this.isCrossMove(idx, idx + 8) && this.addMoveIndex(idx, idx + 8, board, possibleMoves);
    this.isCrossMove(idx, idx - 8) && this.addMoveIndex(idx, idx - 8, board, possibleMoves);

    return possibleMoves;
  }
}
