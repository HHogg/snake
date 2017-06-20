import { combineReducers, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import application from './application';
import canvas from './canvas';
import console from './console';
import editor from './editor';
import game from './game';
import notifier from './notifier';
import solutions from './solutions';
import user from './user';
import localStore from './localStore';

export default function configureStore(initialState) {
  return createStore(
    combineReducers({
      application,
      canvas,
      console,
      editor,
      game,
      notifier,
      solutions,
      user,
    }),
    initialState,
    __DEVELOPMENT__
      ? composeWithDevTools(localStore())
      : compose(localStore()),
  );
}
