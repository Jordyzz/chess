import { Piece } from './Piece';

export class Knight extends Piece {
  constructor(player) {
    super(player, 3);
    this.pieceId = 3;
  }

  getPossibleMoves(src) {
    return [];
  }
}
