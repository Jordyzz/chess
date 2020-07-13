import { GameState, StoreAction } from './redux.interface.d';

export const updateBoard = (payload): StoreAction => ({
  type: 'game/UPDATE_BOARD',
  payload
});

export const setSelectedPiece = (payload): StoreAction => ({
  type: 'game/SET_SELECTED_PIECE',
  payload
});

const initialState: GameState = {
  board: [],
  selectedPiece: null
};

export default function gameReducer(state: GameState = initialState, action: StoreAction) {
  switch (action.type) {
    case 'game/UPDATE_BOARD':
      return { ...state, board: action.payload };
    case 'game/SET_SELECTED_PIECE':
      return { ...state, selectedPiece: action.payload };
    default:
      return state;
  }
}
