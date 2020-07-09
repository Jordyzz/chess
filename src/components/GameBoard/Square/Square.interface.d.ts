import { Piece } from '@core/Pieces/Piece';

export interface SquareProps {
  index: number;
  isLight: boolean;
  piece: Piece;
}
