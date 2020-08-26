import { GameState, StoreAction } from './redux.interface.d';

export const updateBoard = (payload): StoreAction => ({
  type: 'game/UPDATE_BOARD',
  payload
});

export const setSelectedPiece = (payload): StoreAction => ({
  type: 'game/SET_SELECTED_PIECE',
  payload
});

export const clearSelection = () => ({
  type: 'game/CLEAR_SELECTION'
});

export const toggleTurn = () => ({
  type: 'game/TOGGLE_TURN'
});

export const initPlayersPieces = (payload): StoreAction => ({
  type: 'game/INIT_PLAYERS_PIECES',
  payload
});

export const pieceToGraveyard = (payload): StoreAction => ({
  type: 'game/PIECE_TO_GRAVEYARD',
  payload
});

export const updatePieces = (payload): StoreAction => ({
  type: 'game/UPDATE_PIECES',
  payload
});

export const togglePromotion = () => ({
  type: 'game/TOGGLE_PROMOTION'
});

export const checkmate = () => ({
  type: 'game/CHECKMATE'
});

export const setPlayer = (payload): StoreAction => ({
  type: 'game/SET_PLAYER',
  payload
});

export const updateGameState = (payload): StoreAction => ({
  type: 'game/UPDATE_GAME_STATE',
  payload
});

const initialState: GameState = {
  player: null,
  board: [],
  selectedPiece: null,
  currentTurn: 1,
  player1: null,
  player2: null,
  isPromotion: false,
  isCheckmate: false
};

export default function gameReducer(state: GameState = initialState, action: StoreAction) {
  switch (action.type) {
    case 'game/UPDATE_BOARD':
      return { ...state, board: action.payload };
    case 'game/SET_SELECTED_PIECE':
      return { ...state, selectedPiece: action.payload };
    case 'game/CLEAR_SELECTION':
      return { ...state, selectedPiece: null };
    case 'game/TOGGLE_TURN':
      return { ...state, currentTurn: state.currentTurn === 1 ? 2 : 1 };
    case 'game/INIT_PLAYERS_PIECES':
      return {
        ...state,
        player1: { alive: action.payload.player1, graveyard: [] },
        player2: { alive: action.payload.player2, graveyard: [] }
      };
    case 'game/PIECE_TO_GRAVEYARD':
      const playerKey = `player${action.payload.player}`;
      return {
        ...state,
        [playerKey]: {
          alive: state[playerKey].alive.filter(p => p !== action.payload),
          graveyard: [...state[playerKey].graveyard, action.payload]
        }
      };
    case 'game/UPDATE_PIECES':
      return {
        ...state,
        [action.payload.player]: {
          alive: [...action.payload.pieces],
          graveyard: state[action.payload.player].graveyard
        }
      };
    case 'game/TOGGLE_PROMOTION':
      return {
        ...state,
        isPromotion: !state.isPromotion
      };
    case 'game/CHECKMATE':
      return {
        ...state,
        isCheckmate: true
      };
    case 'game/SET_PLAYER':
      return {
        ...state,
        player: action.payload
      };
    case 'game/UPDATE_GAME_STATE':
      return { ...action.payload, player: state.player };
    default:
      return state;
  }
}
