import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'firebase';
import { createSelector } from 'reselect';
import { applicationShowGame } from '../store/application';
import { editorSelectSolution } from '../store/editor';
import { notifierAddErrorNotification } from '../store/notifier';
import {
  solutionsAddLeaderboard,
  solutionsUpdateLeaderboard,
  solutionsRemoveLeaderboard,
} from '../store/solutions';
import Flex from '../components/Flex/Flex';
import Link from '../components/Link/Link';
import Solutions from '../components/Solutions/Solutions';
import Solution from '../components/Solutions/Solution';

class Leaderboard extends Component {
  static propTypes = {
    solutions: PropTypes.array.isRequired,
    onBackToGame: PropTypes.func.isRequired,
    onErrorNotification: PropTypes.func.isRequired,
    onSolutionAdded: PropTypes.func.isRequired,
    onSolutionLoad: PropTypes.func.isRequired,
    onSolutionUpdated: PropTypes.func.isRequired,
    onSolutionRemoved: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {
      onErrorNotification,
      onSolutionAdded,
      onSolutionUpdated,
      onSolutionRemoved,
    } = this.props;

    this.solutionsRef = database()
      .ref('leaderboard')
      .orderByChild('score')
      .startAt(0)
      .limitToLast(20);

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

  handleLoad({ content, title }) {
    const {
      onBackToGame,
      onSolutionLoad,
    } = this.props;

    onSolutionLoad({ content, title });
    onBackToGame();
  }

  render() {
    const {
      onBackToGame,
      solutions,
    } = this.props;

    return (
      <Flex container direction="vertical">
        <Flex>
          <Solutions>
            { solutions.map((solution) =>
              <Solution
                  avatar={ solution.avatar }
                  average={ solution.average }
                  content={ solution.content }
                  displayName={ solution.displayName }
                  key={ solution.key }
                  modified={ solution.modified }
                  onLoad={ () => this.handleLoad(solution) }
                  points={ solution.points }
                  score={ solution.score }
                  title={ solution.title } />
            ) }
          </Solutions>
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
  (state) => state.solutions.leaderboard,
  (solutions) => Object.keys(solutions)
    .map((key) => ({ ...solutions[key], key }))
    .sort((a, b) => b.score - a.score),
);

export default connect((state) => ({
  solutions: solutionsSelector(state),
}), {
  onBackToGame: applicationShowGame,
  onErrorNotification: notifierAddErrorNotification,
  onSolutionAdded: solutionsAddLeaderboard,
  onSolutionLoad: editorSelectSolution,
  onSolutionUpdated: solutionsUpdateLeaderboard,
  onSolutionRemoved: solutionsRemoveLeaderboard,
})(Leaderboard);
