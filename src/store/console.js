import actionCreator from '../utils/actionCreator';
import { GAME_RESET_GAME } from './game';

const initialState = {
  messages: [],
};

const CONSOLE_ADD_MESSAGE = 'CONSOLE_ADD_MESSAGE';
const CONSOLE_CLEAR_MESSAGES = 'CONSOLE_CLEAR_MESSAGES';

export const consoleAddMessage = actionCreator(CONSOLE_ADD_MESSAGE);
export const consoleClearMessages = actionCreator(CONSOLE_CLEAR_MESSAGES);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CONSOLE_ADD_MESSAGE:
    return {
      ...state,
      messages: [
        payload.message,
        ...state.messages,
      ],
    };
  case GAME_RESET_GAME:
  case CONSOLE_CLEAR_MESSAGES:
    return {
      ...state,
      messages: [],
    };
  default:
    return state;
  }
};
