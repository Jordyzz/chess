import { Piece } from './Piece';

export class Queen extends Piece {
  constructor(player, position) {
    super(player, 5, position);
    this.pieceId = 5;
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
