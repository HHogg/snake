import React, { Component, PropTypes } from 'react';
import { database } from 'firebase';
import Flex from '../Flex/Flex';
import AbsoluteChild from '../Layout/AbsoluteChild';
import MaxWidthContainer from '../Layout/MaxWidthContainer';
import Paragraph from '../Paragraph/Paragraph';
import SolutionsTransitionGroup from '../Solutions/SolutionsTransitionGroup';
import SolutionTransition from '../Solutions/SolutionTransition';
import Solution from '../Solutions/Solution';

export default class SavedSolutions extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    onErrorNotification: PropTypes.func.isRequired,
    onSolutionAdded: PropTypes.func.isRequired,
    onSolutionLoad: PropTypes.func.isRequired,
    onSolutionRemoved: PropTypes.func.isRequired,
    onSolutionUpdated: PropTypes.func.isRequired,
    onSuccessNotification: PropTypes.func.isRequired,
    solutions: PropTypes.array.isRequired,
    userId: PropTypes.string,
  };

  componentDidUpdate() {
    if (!this.solutionsRef && this.props.userId) {
      this.addSolutionListeners();
    }
  }

  componentWillUnmount() {
    this.solutionsRef.off();
  }

  addSolutionListeners() {
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
      (error) => onErrorNotification(`Firebase: ${error.message}`));

    this.solutionsRef.on('child_changed',
      (data) => onSolutionUpdated({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(`Firebase: ${error.message}`));

    this.solutionsRef.on('child_removed',
      (data) => onSolutionRemoved({ solution: data.val(), key: data.key }),
      (error) => onErrorNotification(`Firebase: ${error.message}`));
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
      .then(() => onSuccessNotification('That solution has been removed.'))
      .catch((error) => onErrorNotification(error.message));
  }

  handleLoad({ content, key, title }) {
    const {
      history,
      onSolutionLoad,
    } = this.props;

    onSolutionLoad({ content, title, key });
    history.push('/game');
  }

  handleSubmit(solution) {
    const {
      onErrorNotification,
      onSuccessNotification,
      userId,
    } = this.props;

    Promise.all([
      database()
        .ref(`leaderboard/${solution.key}`)
        .update({
          title: solution.title,
          modified: database.ServerValue.TIMESTAMP,
          uid: userId,
        }),
      database()
        .ref(`leaderboardSolutions/${userId}/${solution.key}`)
        .set(solution.content),
    ])
    .then(() => onSuccessNotification(`Solution submitted to Leaderboard! It will take a
      minute to update while the scores are generated.`))
    .catch((error) => onErrorNotification(`Failed to submit to Leaderboard: ${error.message}`));
  }

  render() {
    const {
      avatar,
      solutions,
    } = this.props;

    if (!solutions.length) {
      return (
        <Flex centerChildren container>
          <Paragraph>No Saved Solutions</Paragraph>
        </Flex>
      );
    }

    return (
      <AbsoluteChild type="full">
        <MaxWidthContainer>
          <SolutionsTransitionGroup>
            { solutions.map((solution) =>
              <SolutionTransition key={ solution.key }>
                <Solution
                    avatar={ avatar }
                    average={ solution.average }
                    content={ solution.content }
                    error={ solution.error }
                    isRunning={ solution.running }
                    modified={ solution.modified }
                    onDelete={ () => this.handleDelete(solution) }
                    onLoad={ () => this.handleLoad(solution) }
                    onSubmit={ () => this.handleSubmit(solution) }
                    points={ solution.points }
                    score={ solution.score }
                    title={ solution.title } />
                </SolutionTransition>
              ) }
          </SolutionsTransitionGroup>
        </MaxWidthContainer>
      </AbsoluteChild>
    );
  }
}
