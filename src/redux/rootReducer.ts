import { combineReducers, Reducer } from 'redux';
import * as RI from './redux.interface';
import configReducer from './config';
import gameReducer from './game';

const rootReducer = combineReducers({
  config: configReducer as Reducer<RI.ConfigState>,
  game: gameReducer as Reducer<RI.GameState>
});

export default rootReducer;
