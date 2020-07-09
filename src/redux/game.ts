import { GameState, StoreAction } from './redux.interface.d';

export const updateBoard = (payload): StoreAction => ({
  type: 'game/UPDATE_BOARD',
  payload
});

const initialState: GameState = {
  board: []
};

export default function gameReducer(state: GameState = initialState, action: StoreAction) {
  switch (action.type) {
    case 'game/UPDATE_BOARD':
      return { ...state, board: action.payload };
    default:
      return state;
  }
}
