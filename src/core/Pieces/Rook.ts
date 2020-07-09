import { Piece } from './Piece';

export class Rook extends Piece {
  constructor(player) {
    super(player, 2);
    this.pieceId = 2;
  }

  getPossibleMoves(src) {
    return [];
  }
}
