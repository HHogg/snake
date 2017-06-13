import { combineReducers, compose, createStore } from 'redux';
import canvasReducer from './canvas';
import consoleReducer from './console';
import editorReducer from './editor';
import gameReducer from './game';
import localStore from './localStore';

export default function configureStore(initialState) {
  return createStore(
    combineReducers({
      canvas: canvasReducer,
      console: consoleReducer,
      editor: editorReducer,
      game: gameReducer,
    }),
    initialState,
    compose(localStore()),
  );
}
