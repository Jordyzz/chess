import { Queen } from './Queen';
import { King } from './King';
import { Pawn } from './Pawn';
import { Bishop } from './Bishop';
import { Knight } from './Knight';
import { Rook } from './Rook';

const pieceTypes = {
  Queen,
  King,
  Pawn,
  Bishop,
  Knight,
  Rook
};

class PieceFactory {
  createPiece(type: string, player, position) {
    return new pieceTypes[type](player, position);
  }
}

export const pieceFactory = new PieceFactory();
