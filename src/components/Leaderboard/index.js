import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { CLOUD_CANVAS_SIZE, SNAKE_LENGTH } from '../../../functions/config';
import calculateSingleScore from '../../../functions/common/calculateScore';
import { editorSelectSolution } from '../../store/editor';
import { notifierAddErrorNotification } from '../../store/notifier';
import {
  solutionsAddLeaderboard,
  solutionsAddLeaderboardUser,
  solutionsRemoveLeaderboard,
  solutionsUpdateLeaderboard,
} from '../../store/solutions';
import Leaderboard from './Leaderboard';

const calculateAverage = (data) =>
  data.reduce((acc, n) => acc + n, 0) / data.length;

const calculateScore = (values) =>
  values.reduce((score, _, index) => score + calculateSingleScore(
    CLOUD_CANVAS_SIZE * CLOUD_CANVAS_SIZE,
    calculateAverage(values.slice(0, index + 1)),
    index + 1,
  ), 0);

const solutionsSelector = createSelector(
  (state) => state.solutions.leaderboard,
  (state) => state.solutions.leaderboardUsers,
  (solutions, users) => Object.keys(solutions)
    .map((key) => ({
      ...solutions[key],
      ...users[solutions[key].uid],
      key,
      average: calculateAverage(solutions[key]._pathCount.values),
      points: solutions[key]._pathCount.values.length - 1,
      progress: ((solutions[key]._pathCount.values.length - 1) + SNAKE_LENGTH) /
        (CLOUD_CANVAS_SIZE * CLOUD_CANVAS_SIZE),
      score: calculateScore(solutions[key]._pathCount.values),
    }))
    .sort((a, b) => b.score - a.score),
);

export default connect((state) => ({
  isLoggedIn: !!state.user.id,
  leaderboardUsers: state.solutions.leaderboardUsers,
  solutions: solutionsSelector(state),
}), {
  onErrorNotification: notifierAddErrorNotification,
  onSolutionAdded: solutionsAddLeaderboard,
  onSolutionLoad: editorSelectSolution,
  onSolutionRemoved: solutionsRemoveLeaderboard,
  onSolutionUpdated: solutionsUpdateLeaderboard,
  onSolutionUserAdded: solutionsAddLeaderboardUser,
})(Leaderboard);
