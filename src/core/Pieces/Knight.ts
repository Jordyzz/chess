import { Piece } from './Piece';

export class Knight extends Piece {
  constructor(player, position) {
    super(player, 3, position);
    this.pieceId = 3;
  }

  getPossibleMoves(board) {
    const possibleMoves = [];

    this.isTwoRowJump(this.position, this.position - 15) &&
      this.addMoveIndex(this.position, this.position - 15, board, possibleMoves);
    this.isTwoRowJump(this.position, this.position - 17) &&
      this.addMoveIndex(this.position, this.position - 17, board, possibleMoves);
    this.isCrossMove(this.position, this.position - 10) &&
      this.addMoveIndex(this.position, this.position - 10, board, possibleMoves);
    this.isCrossMove(this.position, this.position - 6) &&
      this.addMoveIndex(this.position, this.position - 6, board, possibleMoves);
    this.isCrossMove(this.position, this.position + 6) &&
      this.addMoveIndex(this.position, this.position + 6, board, possibleMoves);
    this.isCrossMove(this.position, this.position + 10) &&
      this.addMoveIndex(this.position, this.position + 10, board, possibleMoves);
    this.isTwoRowJump(this.position, this.position + 15) &&
      this.addMoveIndex(this.position, this.position + 15, board, possibleMoves);
    this.isTwoRowJump(this.position, this.position + 17) &&
      this.addMoveIndex(this.position, this.position + 17, board, possibleMoves);

    return possibleMoves;
  }

  isTwoRowJump(piecePos, potentialPos) {
    return Math.abs(Math.floor(piecePos / 8) - Math.floor(potentialPos / 8)) === 2;
  }
}
