import actionCreator from '../utils/actionCreator';
import calculateAverage from '../utils/calculateAverage';
import calculateScore from '../utils/calculateScore';

const initialState = {
  average: 0,
  history: [[]],
  isPlaying: false,
  isRunning: false,
  isGameOver: false,
  point: null,
  points: 0,
  score: 0,
  snake: null,
  tails: [],
};

const GAME_COLLECT_POINT = 'GAME_COLLECT_POINT';
const GAME_MOVE_SNAKE_BACKWARDS = 'GAME_MOVE_SNAKE_BACKWARDS';
const GAME_MOVE_SNAKE_FORWARDS = 'GAME_MOVE_SNAKE_FORWARDS';
const GAME_PAUSE_GAME = 'GAME_PAUSE_GAME';
const GAME_PLAY_GAME = 'GAME_PLAY_GAME';
export const GAME_RESET_GAME = 'GAME_RESET_GAME';
const GAME_SET_ENVIRONMENT = 'GAME_SET_ENVIRONMENT';
const GAME_START_GAME = 'GAME_START_GAME';
const GAME_STOP_GAME = 'GAME_STOP_GAME';

export const gameCollectPoint = actionCreator(GAME_COLLECT_POINT);
export const gameMoveSnakeBackwards = actionCreator(GAME_MOVE_SNAKE_BACKWARDS);
export const gameMoveSnakeForwards = actionCreator(GAME_MOVE_SNAKE_FORWARDS);
export const gamePauseGame = actionCreator(GAME_PAUSE_GAME);
export const gamePlayGame = actionCreator(GAME_PLAY_GAME);
export const gameResetGame = actionCreator(GAME_RESET_GAME);
export const gameSetEnvironment = actionCreator(GAME_SET_ENVIRONMENT);
export const gameStartGame = actionCreator(GAME_START_GAME);
export const gameStopGame = actionCreator(GAME_STOP_GAME);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GAME_COLLECT_POINT:
    const history = [
      [payload.point, ...state.history[0]],
      ...state.history.slice(1),
    ];

    return {
      ...state,
      average: calculateAverage(history),
      history: [[], ...history],
      point: payload.point,
      points: state.points + 1,
      score: state.score + calculateScore(payload.xMax * payload.yMax,
        calculateAverage(history),
        history[0].length,
        state.points),
      snake: payload.snake,
      tails: [],
    };
  case GAME_MOVE_SNAKE_BACKWARDS:
    return {
      ...state,
      history: [
        state.history[0].slice(1),
        ...state.history.slice(1),
      ],
      isGameOver: false,
      snake: [
        ...state.snake.slice(1),
        state.tails[0],
      ],
      tails: state.tails.slice(1),
    };
  case GAME_MOVE_SNAKE_FORWARDS:
    return {
      ...state,
      history: [
        [payload.snake[0], ...state.history[0]],
        ...state.history.slice(1),
      ],
      snake: payload.snake,
      tails: [
        payload.tail,
        ...state.tails,
      ],
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
  case GAME_RESET_GAME:
    return initialState;
  case GAME_SET_ENVIRONMENT:
    return {
      ...state,
      point: payload.point,
      snake: payload.snake,
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
