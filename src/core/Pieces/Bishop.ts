import { Piece } from './Piece';

export class Bishop extends Piece {
  constructor(player, position) {
    super(player, 4, position);
    this.pieceId = 4;
  }

  getPossibleMoves(board) {
    const possibleMoves = [];

    for (
      let i = this.position - 7, j = this.position, resume = true;
      this.isCrossMove(i, j) && resume;
      i -= 7, j -= 7
    )
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);

    for (
      let i = this.position + 7, j = this.position, resume = true;
      this.isCrossMove(i, j) && resume;
      i += 7, j += 7
    )
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);

    for (
      let i = this.position + 9, j = this.position, resume = true;
      this.isCrossMove(i, j) && resume;
      i += 9, j += 9
    )
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);

    for (
      let i = this.position - 9, j = this.position, resume = true;
      this.isCrossMove(i, j) && resume;
      i -= 9, j -= 9
    )
      resume = this.addMoveIndex(this.position, i, board, possibleMoves);

    return possibleMoves;
  }
}
