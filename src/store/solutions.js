import { combineActions, createAction, handleActions } from '../utils/reduxActions';
import omit from 'lodash.omit';

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

export const solutionsAddSaved = createAction(SOLUTIONS_ADD_SAVED,
  ({ key, solution }) => ({ key, solution }));
export const solutionsUpdateSaved = createAction(SOLUTIONS_UPDATE_SAVED,
  ({ key, solution }) => ({ key, solution }));
export const solutionsRemoveSaved = createAction(SOLUTIONS_REMOVE_SAVED,
  ({ key }) => ({ key }));
export const solutionsAddLeaderboard = createAction(SOLUTIONS_ADD_LEADERBOARD,
  ({ key, solution }) => ({ key, solution }));
export const solutionsAddLeaderboardUser = createAction(SOLUTIONS_ADD_LEADERBOARD_USER,
  ({ key, user }) => ({ key, user }));
export const solutionsUpdateLeaderboard = createAction(SOLUTIONS_UPDATE_LEADERBOARD,
  ({ key, solution }) => ({ key, solution }));
export const solutionsRemoveLeaderboard = createAction(SOLUTIONS_REMOVE_LEADERBOARD,
  ({ key }) => ({ key }));

export default handleActions({
  [combineActions(
    SOLUTIONS_ADD_SAVED,
    SOLUTIONS_UPDATE_SAVED,
  )]: (state, { payload }) => Object.assign({}, state, {
    saved: Object.assign({}, state.saved, {
      [payload.key]: payload.solution,
    }),
  }),
  [SOLUTIONS_REMOVE_SAVED]: (state, { payload }) => Object.assign({}, state, {
    saved: omit(state.saved, [payload.key]),
  }),
  [combineActions(
    SOLUTIONS_ADD_LEADERBOARD,
    SOLUTIONS_UPDATE_LEADERBOARD,
  )]: ({ leaderboard }, { payload }) => ({
    leaderboard: Object.assign({}, leaderboard, {
      [payload.key]: payload.solution,
    }),
  }),
  [SOLUTIONS_REMOVE_LEADERBOARD]: ({ leaderboard }, { payload }) => ({
    leaderboard: omit(leaderboard, [payload.key]),
  }),
  [SOLUTIONS_ADD_LEADERBOARD_USER]: ({ leaderboardUsers }, { payload }) => ({
    leaderboardUsers: Object.assign({}, leaderboardUsers, {
      [payload.key]: payload.user,
    }),
  }),
}, initialState);
