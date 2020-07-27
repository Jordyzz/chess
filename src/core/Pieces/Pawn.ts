import { Piece } from './Piece';

export class Pawn extends Piece {
  constructor(player, position) {
    super(player, 1, position);
    this.pieceId = 1;
  }

  getPossibleMoves(board) {
    const possibleMoves = [];

    this.isCrossMove(this.position, this.generatePlayerDirection(this.player, this.position, 8)) &&
      this.addMoveIndex(
        this.position,
        this.generatePlayerDirection(this.player, this.position, 8),
        board,
        possibleMoves
      );
    this.isInitialPos() &&
      this.isTwoRowJump(
        this.position,
        this.generatePlayerDirection(this.player, this.position, 16)
      ) &&
      this.addMoveIndex(
        this.position,
        this.generatePlayerDirection(this.player, this.position, 16),
        board,
        possibleMoves
      );

    this.isCrossMove(this.position, this.generatePlayerDirection(this.player, this.position, 9)) &&
      this.addEatIndex(
        this.generatePlayerDirection(this.player, this.position, 9),
        board,
        possibleMoves
      );
    this.isCrossMove(this.position, this.generatePlayerDirection(this.player, this.position, 7)) &&
      this.addEatIndex(
        this.generatePlayerDirection(this.player, this.position, 7),
        board,
        possibleMoves
      );

    return possibleMoves;
  }

  isInitialPos() {
    return this.player == 1
      ? Math.floor(this.position / 8) === 6
      : Math.floor(this.position / 8) === 1;
  }

  addEatIndex(potentialPos, board: Array<Piece>, possibleMoves) {
    board[potentialPos] &&
      board[potentialPos].player !== this.player &&
      possibleMoves.push(potentialPos);
  }

  addMoveIndex(piecePos, potentialPos, board, possibleMoves) {
    if (!board[potentialPos]) possibleMoves.push(potentialPos);

    return true;
  }

  generatePlayerDirection(player, piecePos, direction) {
    return player === 1 ? piecePos - direction : piecePos + direction;
  }

  isTwoRowJump(piecePos, potentialPos) {
    return Math.abs(Math.floor(piecePos / 8) - Math.floor(potentialPos / 8)) === 2;
  }
}
