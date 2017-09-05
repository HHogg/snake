import { createAction, handleActions } from '../utils/reduxActions';

const initialState = {
  about: false,
  game: true,
  leaderboard: false,
  savedSolutions: false,
};

const APPLICATION_SHOW_ABOUT = 'APPLICATION_SHOW_ABOUT';
const APPLICATION_SHOW_GAME = 'APPLICATION_SHOW_GAME';
const APPLICATION_SHOW_LEADERBOARD = 'APPLICATION_SHOW_LEADERBOARD';
const APPLICATION_SHOW_SAVED_SOLUTIONS = 'APPLICATION_SHOW_SAVED_SOLUTIONS';

export const applicationShowAbout = createAction(APPLICATION_SHOW_ABOUT);
export const applicationShowGame = createAction(APPLICATION_SHOW_GAME);
export const applicationShowLeaderboard = createAction(APPLICATION_SHOW_LEADERBOARD);
export const applicationShowSavedSolutions = createAction(APPLICATION_SHOW_SAVED_SOLUTIONS);

export default handleActions({
  [APPLICATION_SHOW_ABOUT]: () => ({
    about: true,
    game: false,
    leaderboard: false,
    savedSolutions: false,
  }),
  [APPLICATION_SHOW_GAME]: () => ({
    about: false,
    game: true,
    leaderboard: false,
    savedSolutions: false,
  }),
  [APPLICATION_SHOW_LEADERBOARD]: () => ({
    about: false,
    game: false,
    leaderboard: true,
    savedSolutions: false,
  }),
  [APPLICATION_SHOW_SAVED_SOLUTIONS]: () => ({
    about: false,
    game: false,
    leaderboard: false,
    savedSolutions: true,
  }),
}, initialState);
