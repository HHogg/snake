import { combineActions, createAction, handleActions } from '../utils/reduxActions';
import { GAME_RESET_GAME } from './game';

const initialState = {
  messages: [],
};

const CONSOLE_ADD_MESSAGE = 'CONSOLE_ADD_MESSAGE';
const CONSOLE_CLEAR_MESSAGES = 'CONSOLE_CLEAR_MESSAGES';

export const consoleAddMessage = createAction(CONSOLE_ADD_MESSAGE,
  ({ message }) => ({ message }));
export const consoleClearMessages = createAction(CONSOLE_CLEAR_MESSAGES);

export default handleActions({
  [CONSOLE_ADD_MESSAGE]: ({ messages }, { payload }) => ({
    messages: [payload.message].concat(messages),
  }),
  [combineActions(GAME_RESET_GAME, CONSOLE_CLEAR_MESSAGES)]: () => ({
    messages: [],
  }),
}, initialState);
