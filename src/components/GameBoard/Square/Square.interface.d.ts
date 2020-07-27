import { Piece } from '@core/Pieces/Piece';

export interface SquareProps {
  index: number;
  isLight: boolean;
  isColored: boolean;
  piece: Piece;
  setSelected: (piece, idx) => void;
}
