import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import application from './application';
import canvas from './canvas';
import console from './console';
import editor from './editor';
import game from './game';
import notifier from './notifier';
import solutions from './solutions';
import ui from './ui';
import user from './user';

export default combineReducers({
  application,
  canvas,
  console,
  editor,
  game,
  notifier,
  routing: routerReducer,
  solutions,
  ui,
  user,
});
