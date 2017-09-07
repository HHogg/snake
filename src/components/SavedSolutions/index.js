import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { editorSelectSolution } from '../../store/editor';
import {
  notifierAddErrorNotification,
  notifierAddSuccessNotification,
} from '../../store/notifier';
import {
  solutionsAddSaved,
  solutionsUpdateSaved,
  solutionsRemoveSaved,
} from '../../store/solutions';
import SavedSolutions from './SavedSolutions';

const solutionsSelector = createSelector(
  (state) => state.solutions.saved,
  (solutions) => Object.keys(solutions)
    .map((key) => ({ ...solutions[key], key })),
);

export default connect((state) => ({
  avatar: state.user.avatar,
  solutions: solutionsSelector(state),
  userId: state.user.id,
  displayName: state.user.displayName,
}), {
  onErrorNotification: notifierAddErrorNotification,
  onSolutionAdded: solutionsAddSaved,
  onSolutionLoad: editorSelectSolution,
  onSolutionRemoved: solutionsRemoveSaved,
  onSolutionUpdated: solutionsUpdateSaved,
  onSuccessNotification: notifierAddSuccessNotification,
})(SavedSolutions);
