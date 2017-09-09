import React, { Component, PropTypes } from 'react';
import { database } from 'firebase';
import { LEADERBOARD_LIMIT } from '../../../functions/config';
import Flex from '../Flex/Flex';
import AbsoluteChild from '../Layout/AbsoluteChild';
import MaxWidthContainer from '../Layout/MaxWidthContainer';
import SolutionsTransitionGroup from '../Solutions/SolutionsTransitionGroup';
import SolutionTransition from '../Solutions/SolutionTransition';
import Solution from '../Solutions/Solution';
import Text from '../Text/Text';

export default class Leaderboard extends Component {
  static propTypes = {
    solutions: PropTypes.array.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    leaderboardUsers: PropTypes.object.isRequired,
    onErrorNotification: PropTypes.func.isRequired,
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
      .orderByChild('_pathCount/length')
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
      history,
      onSolutionLoad,
    } = this.props;

    onSolutionLoad({ content, title });
    history.push('/game');
  }

  render() {
    const { solutions } = this.props;

    if (!solutions.length) {
      return (
        <Flex
            alignChildrenHorizontal="middle"
            alignChildrenVertical="middle"
            container>
          <Text>No Leaderboard Solutions</Text>
        </Flex>
      );
    }

    return (
      <AbsoluteChild type="full">
        <MaxWidthContainer>
          <SolutionsTransitionGroup>
            { solutions.map((solution, index) =>
              <SolutionTransition key={ solution.key }>
                <Solution { ...solution }
                    avatarSize="3rem"
                    position={ index + 1 } />
              </SolutionTransition>
            ) }
          </SolutionsTransitionGroup>
        </MaxWidthContainer>
      </AbsoluteChild>
    );
  }
}
