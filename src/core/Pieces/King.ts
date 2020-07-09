import { Piece } from './Piece';

export class King extends Piece {
  constructor(player) {
    super(player, 6);
    this.pieceId = 6;
  }

  getPossibleMoves(src) {
    return [];
  }
}
