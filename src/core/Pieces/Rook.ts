import { Piece } from './Piece';

export class Rook extends Piece {
  public dirty = false;

  constructor(player, position) {
    super(player, 2, position);
    this.pieceId = 2;
  }

  getPossibleMoves(board) {
    const possibleMoves = [];

    for (let i = this.position - 8, resume = true; i / 8 > 0 && resume; i -= 8) {
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);
    }

    for (let i = this.position + 8, resume = true; i < 64 && resume; i += 8) {
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);
    }

    for (
      let i = this.position - 1, resume = true;
      this.isSameRowMove(i, this.position) && resume;
      i--
    )
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);

    for (
      let i = this.position + 1, resume = true;
      this.isSameRowMove(i, this.position) && resume;
      i++
    )
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);

    return possibleMoves;
  }
}
