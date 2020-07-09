import { Piece } from './Piece';

export class Pawn extends Piece {
  constructor(player) {
    super(player, 1);
    this.pieceId = 1;
  }

  getPossibleMoves(src) {
    return [];
  }
}
