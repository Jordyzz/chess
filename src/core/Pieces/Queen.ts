import { Piece } from './Piece';

export class Queen extends Piece {
  constructor(player) {
    super(player, 5);
    this.pieceId = 5;
  }

  getPossibleMoves(src) {
    return [];
  }
}
