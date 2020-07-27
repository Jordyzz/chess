import { pieceIcons } from '@src/utils/pieceIcons';

export abstract class Piece {
  public pieceId;
  public player;
  public icon;
  public position;

  constructor(player, piece, position) {
    this.player = player;
    this.icon = pieceIcons[player][piece]; // add map of icons
    this.position = position;
  }

  abstract getPossibleMoves(board: Array<Piece>): Array<number>;

  addMoveIndex(piecePos, potentialPos, board, possibleMoves) {
    if (potentialPos > 63 || potentialPos < 0) return false;
    if (!board[potentialPos]) possibleMoves.push(potentialPos);
    else if (board[potentialPos].player === board[piecePos].player) return false;
    else {
      possibleMoves.push(potentialPos);
      return false;
    }

    return true;
  }

  isSameRowMove(piecePos, potentialPos) {
    return Math.floor(piecePos / 8) % 2 === Math.floor(potentialPos / 8) % 2;
  }

  isCrossMove(piecePos, potentialPos) {
    return Math.abs(Math.floor(piecePos / 8) - Math.floor(potentialPos / 8)) === 1;
  }
}
