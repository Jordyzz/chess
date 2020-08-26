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
  player: Player;
  board: Array<Piece>;
  selectedPiece: Piece;
  currentTurn: player;
  player1: PlayerPieces;
  player2: PlayerPieces;
  isPromotion: boolean;
  isCheckmate: boolean;
}

export interface PlayerPieces {
  alive: Array<Piece>;
  graveyard: Array<Piece>;
}

type player = 1 | 2;

export interface Player {
  socket: any;
  id: player;
  room: string;
}
