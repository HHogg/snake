import { createSelector } from 'reselect';
import actionCreator from '../utils/actionCreator';
import { createBlock, moveForwards, moveBackwards } from '../utils/history';

const initialState = {
  history: [],
  isPlaying: false,
  isRunning: false,
  isGameOver: false,
};

const GAME_COLLECT_POINT = 'GAME_COLLECT_POINT';
const GAME_MOVE_SNAKE_BACKWARDS = 'GAME_MOVE_SNAKE_BACKWARDS';
const GAME_MOVE_SNAKE_FORWARDS = 'GAME_MOVE_SNAKE_FORWARDS';
const GAME_PAUSE_GAME = 'GAME_PAUSE_GAME';
const GAME_PLAY_GAME = 'GAME_PLAY_GAME';
const GAME_POP_HISTORY = 'GAME_POP_HISTORY';
export const GAME_RESET_GAME = 'GAME_RESET_GAME';
const GAME_SET_ENVIRONMENT = 'GAME_SET_ENVIRONMENT';
const GAME_START_GAME = 'GAME_START_GAME';
const GAME_STOP_GAME = 'GAME_STOP_GAME';

export const gameCollectPoint = actionCreator(GAME_COLLECT_POINT);
export const gameMoveSnakeBackwards = actionCreator(GAME_MOVE_SNAKE_BACKWARDS);
export const gameMoveSnakeForwards = actionCreator(GAME_MOVE_SNAKE_FORWARDS);
export const gamePauseGame = actionCreator(GAME_PAUSE_GAME);
export const gamePlayGame = actionCreator(GAME_PLAY_GAME);
export const gamePopHistory = actionCreator(GAME_POP_HISTORY);
export const gameResetGame = actionCreator(GAME_RESET_GAME);
export const gameSetEnvironment = actionCreator(GAME_SET_ENVIRONMENT);
export const gameStartGame = actionCreator(GAME_START_GAME);
export const gameStopGame = actionCreator(GAME_STOP_GAME);

export const selectGameHistory = ({ game }) => game.history;
export const selectGameNow = createSelector(selectGameHistory, (h) => h[h.length - 1]);
export const selectGamePrev = createSelector(selectGameHistory, (h) => h[h.length - 2]);
export const selectGameNowPoint = createSelector(selectGameNow, (h) => h && h[0]);
export const selectGameNowSnake = createSelector(selectGameNow, (h) => h && h[1]);
export const selectGameNowTails = createSelector(selectGameNow, (h) => h && h[2]);
export const selectGamePrevPoint = createSelector(selectGamePrev, (h) => h && h[0]);
export const selectGamePrevSnake = createSelector(selectGamePrev, (h) => h && h[1]);
export const selectGamePrevTails = createSelector(selectGamePrev, (h) => h && h[2]);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GAME_COLLECT_POINT:
    return {
      ...state,
      history: createBlock(
        state.history,
        state.history.length,
        payload.snake,
        payload.point,
      ),
    };
  case GAME_MOVE_SNAKE_BACKWARDS:
    return {
      ...state,
      history: moveBackwards(state.history, state.history.length - 1),
      isGameOver: false,
    };
  case GAME_MOVE_SNAKE_FORWARDS:
    return {
      ...state,
      history: moveForwards(state.history, state.history.length - 1, payload.snake, payload.tail),
    };
  case GAME_PAUSE_GAME:
    return {
      ...state,
      isRunning: false,
    };
  case GAME_PLAY_GAME:
    return {
      ...state,
      isRunning: true,
    };
  case GAME_POP_HISTORY:
    return {
      ...state,
      history: state.history.slice(0, -1),
      isGameOver: false,
    };
  case GAME_RESET_GAME:
    return initialState;
  case GAME_SET_ENVIRONMENT:
    return {
      ...state,
      history: createBlock(
        state.history,
        0,
        payload.snake,
        payload.point,
      ),
    };
  case GAME_START_GAME:
    return {
      ...state,
      isPlaying: true,
    };
  case GAME_STOP_GAME:
    return {
      ...state,
      isRunning: false,
      isGameOver: true,
    };
  default:
    return state;
  }
};
