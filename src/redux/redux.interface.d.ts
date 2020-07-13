import { Piece } from '@core/Pieces/Piece';

export interface StoreState {
  config: ConfigState;
  game: GameState;
}

export interface StoreAction {
  type: string;
  payload: any;
}

export interface ConfigState {
  theme: string;
  busyCounter: number;
  errorMessages: Array<string>;
}

export interface GameState {
  board: Array<Piece>;
  selectedPiece: Piece;
}
