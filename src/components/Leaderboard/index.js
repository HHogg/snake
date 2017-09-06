import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { applicationShowGame, applicationShowSavedSolutions } from '../../store/application';
import { editorSelectSolution } from '../../store/editor';
import { notifierAddErrorNotification } from '../../store/notifier';
import {
  solutionsAddLeaderboard,
  solutionsAddLeaderboardUser,
  solutionsRemoveLeaderboard,
  solutionsUpdateLeaderboard,
} from '../../store/solutions';
import Leaderboard from './Leaderboard';

const solutionsSelector = createSelector(
  (state) => state.solutions.leaderboard,
  (state) => state.solutions.leaderboardUsers,
  (solutions, users) => Object.keys(solutions)
    .map((key) => ({ ...solutions[key], ...users[solutions[key].uid], key }))
    .sort((a, b) => b._score.score - a._score.score),
);

export default connect((state) => ({
  isLoggedIn: !!state.user.id,
  leaderboardUsers: state.solutions.leaderboardUsers,
  solutions: solutionsSelector(state),
}), {
  onBackToGame: applicationShowGame,
  onErrorNotification: notifierAddErrorNotification,
  onShowSavedSolutions: applicationShowSavedSolutions,
  onSolutionAdded: solutionsAddLeaderboard,
  onSolutionLoad: editorSelectSolution,
  onSolutionRemoved: solutionsRemoveLeaderboard,
  onSolutionUpdated: solutionsUpdateLeaderboard,
  onSolutionUserAdded: solutionsAddLeaderboardUser,
})(Leaderboard);
