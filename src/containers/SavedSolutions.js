import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'firebase';
import { createSelector } from 'reselect';
import { applicationShowGame } from '../store/application';
import { editorSelectSolution } from '../store/editor';
import {
  notifierAddErrorNotification,
  notifierAddSuccessNotification,
} from '../store/notifier';
import {
  solutionsAddSaved,
  solutionsUpdateSaved,
  solutionsRemoveSaved,
} from '../store/solutions';
import Flex from '../components/Flex/Flex';
import Link from '../components/Link/Link';
import Solutions from '../components/Solutions/Solutions';
import Solution from '../components/Solutions/Solution';

class SavedSolutions extends Component {
  static propTypes = {
    avatar: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    onBackToGame: PropTypes.func.isRequired,
    onErrorNotification: PropTypes.func.isRequired,
    onSolutionAdded: PropTypes.func.isRequired,
    onSolutionLoad: PropTypes.func.isRequired,
    onSolutionRemoved: PropTypes.func.isRequired,
    onSolutionUpdated: PropTypes.func.isRequired,
    onSuccessNotification: PropTypes.func.isRequired,
    solutions: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
  };

  componentWillMount() {
    const {
      onErrorNotification,
      onSolutionAdded,
      onSolutionUpdated,
      onSolutionRemoved,
      userId,
    } = this.props;

    this.solutionsRef = database().ref(`solutions/${userId}`);

    this.solutionsRef.on('child_added',
      (data) => onSolutionAdded({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(error.message));

    this.solutionsRef.on('child_changed',
      (data) => onSolutionUpdated({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(error.message));

    this.solutionsRef.on('child_removed',
      (data) => onSolutionRemoved({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(error.message));
  }

  componentWillUnmount() {
    this.solutionsRef.off();
  }

  handleDelete(solution) {
    const {
      onErrorNotification,
      onSuccessNotification,
      userId,
    } = this.props;

    database()
      .ref(`solutions/${userId}/${solution.key}`)
      .remove()
      .then(() => onSuccessNotification('Solution removed'))
      .catch((error) => onErrorNotification(error.message));
  }

  handleLoad({ content, key, title }) {
    const {
      onBackToGame,
      onSolutionLoad,
    } = this.props;

    onSolutionLoad({ content, title, key });
    onBackToGame();
  }

  handleSubmit(solution) {
    const {
      avatar,
      displayName,
      onErrorNotification,
      onSuccessNotification,
      userId,
    } = this.props;

    database()
      .ref(`leaderboard/${solution.key}`)
      .set({
        ...solution,
        avatar,
        displayName,
        modified: database.ServerValue.TIMESTAMP,
        uid: userId,
      })
      .then(() => onSuccessNotification('Solution submitted to leaderboard'))
      .catch((error) => onErrorNotification(error.message));
  }

  render() {
    const {
      avatar,
      displayName,
      onBackToGame,
      solutions,
    } = this.props;

    return (
      <Flex container direction="vertical">
        <Flex
            centerChildren={ !solutions.length }
            container
            direction="vertical">
          { !!solutions.length && (
            <Solutions>
              { solutions.map((solution) =>
                <Solution
                    avatar={ avatar }
                    average={ solution.average }
                    content={ solution.content }
                    displayName={ displayName }
                    key={ solution.key }
                    modified={ solution.modified }
                    onDelete={ () => this.handleDelete(solution) }
                    onLoad={ () => this.handleLoad(solution) }
                    onSubmit={ () => this.handleSubmit(solution) }
                    points={ solution.points }
                    score={ solution.score }
                    title={ solution.title } />
              ) }
            </Solutions>
          ) }

          { !solutions.length && (
            <Flex shrink>
              No solutions
            </Flex>
          ) }
        </Flex>

        <Flex shrink>
          <Link onClick={ () => onBackToGame() }>
            {'<'} Back to Game
          </Link>
        </Flex>
      </Flex>
    );
  }
}

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
  onBackToGame: applicationShowGame,
  onErrorNotification: notifierAddErrorNotification,
  onSolutionAdded: solutionsAddSaved,
  onSolutionLoad: editorSelectSolution,
  onSolutionRemoved: solutionsRemoveSaved,
  onSolutionUpdated: solutionsUpdateSaved,
  onSuccessNotification: notifierAddSuccessNotification,
})(SavedSolutions);
