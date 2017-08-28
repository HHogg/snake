import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'firebase';
import { createSelector } from 'reselect';
import { CLOUD_CANVAS_SIZE, CLOUD_RUN_TIMES, LEADERBOARD_LIMIT } from '../../functions/config';
import { applicationShowGame, applicationShowSavedSolutions } from '../store/application';
import { editorSelectSolution } from '../store/editor';
import { notifierAddErrorNotification } from '../store/notifier';
import {
  solutionsAddLeaderboard,
  solutionsAddLeaderboardUser,
  solutionsRemoveLeaderboard,
  solutionsUpdateLeaderboard,
} from '../store/solutions';
import Flex from '../components/Flex/Flex';
import Link from '../components/Link/Link';
import Paragraph from '../components/Paragraph/Paragraph';
import Solutions from '../components/Solutions/Solutions';
import Solution from '../components/Solutions/Solution';

const plural = (n, s, p) => n === 1 ? s : p;

class Leaderboard extends Component {
  static propTypes = {
    solutions: PropTypes.array.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    leaderboardUsers: PropTypes.object.isRequired,
    onBackToGame: PropTypes.func.isRequired,
    onErrorNotification: PropTypes.func.isRequired,
    onShowSavedSolutions: PropTypes.func.isRequired,
    onSolutionAdded: PropTypes.func.isRequired,
    onSolutionLoad: PropTypes.func.isRequired,
    onSolutionRemoved: PropTypes.func.isRequired,
    onSolutionUpdated: PropTypes.func.isRequired,
    onSolutionUserAdded: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      onErrorNotification,
      onSolutionAdded,
      onSolutionRemoved,
      onSolutionUpdated,
      onSolutionUserAdded,
    } = this.props;

    this.solutionsRef = database()
      .ref('leaderboard')
      .orderByChild('_score/score')
      .startAt(0)
      .limitToLast(LEADERBOARD_LIMIT);

    this.solutionsRef.on('child_added',
      (data) => {
        const solution = data.val();

        if (!this.props.leaderboardUsers[solution.uid]) {
          database()
            .ref(`/users/${solution.uid}`)
            .once('value', (user) => {
              onSolutionUserAdded({ user: user.val(), key: solution.uid });
              onSolutionAdded({ solution, key: data.key });
            });
        } else {
          onSolutionAdded({ solution, key: data.key });
        }
      },
      (error) => onErrorNotification(`Firebase: ${error.message}`));

    this.solutionsRef.on('child_changed',
      (data) => onSolutionUpdated({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(`Firebase: ${error.message}`));

    this.solutionsRef.on('child_removed',
      (data) => onSolutionRemoved({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(`Firebase: ${error.message}`));
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
      onShowSavedSolutions,
      isLoggedIn,
      solutions,
    } = this.props;

    return (
      <Flex container>
        <Flex alignSelf="end">
          <Paragraph>
            The Leaderboard shows the top 20 scoring solutions.
          </Paragraph>

          <Paragraph>
            All solutions are run { CLOUD_RUN_TIMES } { plural(CLOUD_RUN_TIMES, 'time', 'times') }
            using <Link href="https://firebase.google.com/products/functions/">Firebase
            cloud functions</Link> on a { CLOUD_CANVAS_SIZE } x { CLOUD_CANVAS_SIZE } grid.
            { plural(CLOUD_RUN_TIMES, '', `Out of those ${ CLOUD_RUN_TIMES } runs the highest
              score is what is taken for the Leaderboard.`) },
          </Paragraph>

          <Paragraph>
            To submit your solution to the Leaderboard you need to have authenticated
            with Github. Once authenticated, save a solution and
            from <Link onClick={ () => isLoggedIn && onShowSavedSolutions() }>My Saved
            Solutions</Link> click 'Submit' on a solution.
          </Paragraph>
        </Flex>

        <Flex
            centerChildren={ !solutions.length }
            container
            direction="vertical"
            priority="2">
          { !!solutions.length && (
            <Solutions>
              { solutions.map((solution) =>
                <Solution
                    avatar={ solution.avatar }
                    average={ (solution._score || {}).average }
                    content={ solution.content }
                    displayName={ solution.displayName }
                    key={ solution.key }
                    modified={ solution.modified }
                    points={ (solution._score || {}).points }
                    score={ (solution._score || {}).score }
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
      </Flex>
    );
  }
}

const solutionsSelector = createSelector(
  (state) => state.solutions.leaderboard,
  (state) => state.solutions.leaderboardUsers,
  (solutions, users) => Object.keys(solutions)
    .map((key) => ({ ...solutions[key], ...users[solutions[key].uid], key }))
    .sort((a, b) => b.score - a.score),
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
