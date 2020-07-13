import { pieceIcons } from '@src/utils/pieceIcons';

export abstract class Piece {
  public pieceId;
  public player;
  public icon;

  constructor(player, piece) {
    this.player = player;
    this.icon = pieceIcons[player][piece]; // add map of icons
  }

  abstract getPossibleMoves(src: number): Array<number>;

  addMoveIndex(piecePos, potentialPos, board, possibleMoves) {
    if (!board[potentialPos]) possibleMoves.push(potentialPos);
    else if (board[potentialPos].player === board[piecePos].player) return false;
    else {
      possibleMoves.push(potentialPos);
      return false;
    }

    return true;
  }
}
