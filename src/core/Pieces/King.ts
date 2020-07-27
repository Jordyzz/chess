import { Piece } from './Piece';

export class King extends Piece {
  public dirty = false;

  constructor(player, position) {
    super(player, 6, position);
    this.pieceId = 6;
  }

  getPossibleMoves(board) {
    const possibleMoves = [];

    this.isSameRowMove(this.position, this.position - 1) &&
      this.addMoveIndex(this.position, this.position - 1, board, possibleMoves);
    this.isSameRowMove(this.position, this.position + 1) &&
      this.addMoveIndex(this.position, this.position + 1, board, possibleMoves);
    this.isCrossMove(this.position, this.position - 7) &&
      this.addMoveIndex(this.position, this.position - 7, board, possibleMoves);
    this.isCrossMove(this.position, this.position + 7) &&
      this.addMoveIndex(this.position, this.position + 7, board, possibleMoves);
    this.isCrossMove(this.position, this.position - 9) &&
      this.addMoveIndex(this.position, this.position - 9, board, possibleMoves);
    this.isCrossMove(this.position, this.position + 9) &&
      this.addMoveIndex(this.position, this.position + 9, board, possibleMoves);
    this.isCrossMove(this.position, this.position + 8) &&
      this.addMoveIndex(this.position, this.position + 8, board, possibleMoves);
    this.isCrossMove(this.position, this.position - 8) &&
      this.addMoveIndex(this.position, this.position - 8, board, possibleMoves);

    return this.checkCastling(possibleMoves, board);
  }

  checkCastling(possibleMoves, board) {
    if (!this.dirty) {
      if (
        !board[this.position + 1] &&
        !board[this.position + 2] &&
        board[this.position + 3] &&
        !board[this.position + 3].dirty
      )
        possibleMoves.push(this.position + 2);

      if (
        !board[this.position - 1] &&
        !board[this.position - 2] &&
        !board[this.position - 3] &&
        board[this.position - 4] &&
        !board[this.position - 4].dirty
      )
        possibleMoves.push(this.position - 2);
    }

    return possibleMoves;
  }
}
