import omit from 'lodash.omit';
import actionCreator from '../utils/actionCreator';

const initialState = {
  leaderboard: {},
  leaderboardUsers: {},
  saved: {},
};

const SOLUTIONS_ADD_SAVED = 'SOLUTIONS_ADD_SAVED';
const SOLUTIONS_UPDATE_SAVED = 'SOLUTIONS_UPDATE_SAVED';
const SOLUTIONS_REMOVE_SAVED = 'SOLUTIONS_REMOVE_SAVED';

const SOLUTIONS_ADD_LEADERBOARD = 'SOLUTIONS_ADD_LEADERBOARD';
const SOLUTIONS_ADD_LEADERBOARD_USER = 'SOLUTIONS_ADD_LEADERBOARD_USER';
const SOLUTIONS_UPDATE_LEADERBOARD = 'SOLUTIONS_UPDATE_LEADERBOARD';
const SOLUTIONS_REMOVE_LEADERBOARD = 'SOLUTIONS_REMOVE_LEADERBOARD';

export const solutionsAddSaved = actionCreator(SOLUTIONS_ADD_SAVED);
export const solutionsUpdateSaved = actionCreator(SOLUTIONS_UPDATE_SAVED);
export const solutionsRemoveSaved = actionCreator(SOLUTIONS_REMOVE_SAVED);

export const solutionsAddLeaderboard = actionCreator(SOLUTIONS_ADD_LEADERBOARD);
export const solutionsAddLeaderboardUser = actionCreator(SOLUTIONS_ADD_LEADERBOARD_USER);
export const solutionsUpdateLeaderboard = actionCreator(SOLUTIONS_UPDATE_LEADERBOARD);
export const solutionsRemoveLeaderboard = actionCreator(SOLUTIONS_REMOVE_LEADERBOARD);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SOLUTIONS_ADD_SAVED:
  case SOLUTIONS_UPDATE_SAVED:
    return {
      ...state,
      saved: {
        ...state.saved,
        [payload.key]: payload.solution,
      },
    };
  case SOLUTIONS_REMOVE_SAVED:
    return {
      ...state,
      saved: omit(state.saved, [payload.key]),
    };
  case SOLUTIONS_ADD_LEADERBOARD:
  case SOLUTIONS_UPDATE_LEADERBOARD:
    return {
      ...state,
      leaderboard: {
        ...state.leaderboard,
        [payload.key]: payload.solution,
      },
    };
  case SOLUTIONS_ADD_LEADERBOARD_USER:
    return {
      ...state,
      leaderboardUsers: {
        ...state.leaderboardUsers,
        [payload.key]: payload.user,
      },
    };
  case SOLUTIONS_REMOVE_LEADERBOARD:
    return {
      ...state,
      leaderboard: omit(state.leaderboard, [payload.key]),
    };
  default:
    return state;
  }
};
