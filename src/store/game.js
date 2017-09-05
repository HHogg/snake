import { createSelector } from 'reselect';
import { createAction, handleActions } from '../utils/reduxActions';
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

export const gameCollectPoint = createAction(GAME_COLLECT_POINT,
  ({ snake, point }) => ({ snake, point }));
export const gameMoveSnakeForwards = createAction(GAME_MOVE_SNAKE_FORWARDS,
  ({ snake, tail }) => ({ snake, tail }));
export const gameMoveSnakeBackwards = createAction(GAME_MOVE_SNAKE_BACKWARDS);
export const gamePauseGame = createAction(GAME_PAUSE_GAME);
export const gamePlayGame = createAction(GAME_PLAY_GAME);
export const gamePopHistory = createAction(GAME_POP_HISTORY);
export const gameResetGame = createAction(GAME_RESET_GAME);
export const gameSetEnvironment = createAction(GAME_SET_ENVIRONMENT,
  ({ snake, point }) => ({ snake, point }));
export const gameStartGame = createAction(GAME_START_GAME);
export const gameStopGame = createAction(GAME_STOP_GAME);

export const selectGameHistory = ({ game }) => game.history;
export const selectGameNow = createSelector(selectGameHistory, (h) => h[h.length - 1]);
export const selectGamePrev = createSelector(selectGameHistory, (h) => h[h.length - 2]);
export const selectGameNowPoint = createSelector(selectGameNow, (h) => h && h[0]);
export const selectGameNowSnake = createSelector(selectGameNow, (h) => h && h[1]);
export const selectGameNowTails = createSelector(selectGameNow, (h) => h && h[2]);
export const selectGamePrevPoint = createSelector(selectGamePrev, (h) => h && h[0]);
export const selectGamePrevSnake = createSelector(selectGamePrev, (h) => h && h[1]);
export const selectGamePrevTails = createSelector(selectGamePrev, (h) => h && h[2]);

export default handleActions({
  [GAME_COLLECT_POINT]: ({ history }, { payload }) => ({
    history: createBlock(history, history.length, payload.snake, payload.point),
  }),
  [GAME_MOVE_SNAKE_BACKWARDS]: ({ history }) => ({
    history: moveBackwards(history, history.length - 1),
    isGameOver: false,
  }),
  [GAME_MOVE_SNAKE_FORWARDS]: ({ history }, { payload }) => ({
    history: moveForwards(history, history.length - 1, payload.snake, payload.tail),
  }),
  [GAME_PAUSE_GAME]: () => ({
    isRunning: false,
  }),
  [GAME_PLAY_GAME]: () => ({
    isRunning: true,
  }),
  [GAME_POP_HISTORY]: ({ history }) => ({
    history: history.slice(0, -1),
    isGameOver: false,
  }),
  [GAME_RESET_GAME]: () => initialState,
  [GAME_SET_ENVIRONMENT]: ({ history }, { payload }) => ({
    history: createBlock(history, 0, payload.snake, payload.point),
  }),
  [GAME_START_GAME]: () => ({
    isPlaying: true,
  }),
  [GAME_STOP_GAME]: () => ({
    isRunning: false,
    isGameOver: true,
  }),
}, initialState);
