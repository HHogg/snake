import { combineReducers } from 'redux';
import canvas from './canvas';
import console from './console';
import editor from './editor';
import game from './game';
import notifier from './notifier';
import solutions from './solutions';
import user from './user';

export default combineReducers({
  canvas,
  console,
  editor,
  game,
  notifier,
  solutions,
  user,
});
