import React, { Component, PropTypes } from 'react';
import { database } from 'firebase';
import MaxWidthContainer from '../Layout/MaxWidthContainer';
import Paragraph from '../Paragraph/Paragraph';
import Solutions from '../Solutions/Solutions';
import Solution from '../Solutions/Solution';

export default class SavedSolutions extends Component {
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

  componentDidMount() {
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
      .then(() => onSuccessNotification('That solution has been removed.'))
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
      displayName,
      solutions,
    } = this.props;

    return (
      <MaxWidthContainer>
        { !!solutions.length && (
          <Solutions>
            { solutions.map((solution) =>
              <Solution
                  avatar={ avatar }
                  average={ solution.average }
                  content={ solution.content }
                  displayName={ displayName }
                  error={ solution.error }
                  isRunning={ solution.running }
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
          <Paragraph>
            No solutions
          </Paragraph>
        ) }
      </MaxWidthContainer>
    );
  }
}
