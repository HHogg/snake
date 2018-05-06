import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { database } from 'firebase';
import { transitionTimeFast, Appear, Flex, Responsive, Text } from 'preshape';
import { widthSmall } from '../Root';
import SavedSolution from './SavedSolution';
import SignInRequired from '../Auth/SignInRequired';

export default class SavedSolutions extends Component {
  static propTypes = {
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
    if (this.solutionsRef) {
      this.solutionsRef.off();
    }
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
    history.push('/');
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
      solutions,
    } = this.props;

    return (
      <SignInRequired>
        <Flex
            direction="vertical"
            grow
            gutter="x12"
            maxWidth="48rem"
            paddingHorizontal="x3"
            paddingVertical="x12">
          <Flex>
            <Text size="title">My Saved Solutions</Text>
          </Flex>

          { !solutions.length && (
            <Flex
                alignChildrenHorizontal="middle"
                alignChildrenVertical="middle"
                direction="horizontal"
                grow>
              <Text>No Saved Solutions</Text>
            </Flex>
          ) }

          { !!solutions.length && (
            <Responsive queries={ [widthSmall] }>
              { (match) => (
                <Flex>
                  { solutions.map((solution, index) => (
                    <Appear
                        delay={ transitionTimeFast * index }
                        key={ solution.key }
                        margin="x2">
                      <SavedSolution { ...solution }
                          compact={ !match(widthSmall) }
                          onDelete={ () => this.handleDelete(solution) }
                          onLoad={ () => this.handleLoad(solution) }
                          onSubmit={ () => this.handleSubmit(solution) } />
                    </Appear>
                  )) }
                </Flex>
              ) }
            </Responsive>
          ) }
        </Flex>
      </SignInRequired>
    );
  }
}
