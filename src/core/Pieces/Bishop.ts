import { Piece } from './Piece';

export class Bishop extends Piece {
  constructor(player) {
    super(player, 4);
    this.pieceId = 4;
  }

  getPossibleMoves(src) {
    return [];
  }
}
