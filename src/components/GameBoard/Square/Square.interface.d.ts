import { Piece } from '@core/Pieces/Piece';

export interface SquareProps {
  index: number;
  isLight: boolean;
  color: string;
  piece: Piece;
  setSelected: (idx) => void;
}
