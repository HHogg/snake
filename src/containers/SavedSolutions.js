import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'firebase';
import { createSelector } from 'reselect';
import { applicationShowGame } from '../store/application';
import { editorSelectSolution } from '../store/editor';
import { notifierAddNotfication } from '../store/notifier';
import {
  solutionsAddSaved,
  solutionsUpdateSaved,
  solutionsRemoveSaved,
} from '../store/solutions';
import AppContainer from '../components/App/AppContainer';
import AppPane from '../components/App/AppPane';
import AppSection from '../components/App/AppSection';
import Link from '../components/Link/Link';
import Solutions from '../components/Solutions/Solutions';
import Solution from '../components/Solutions/Solution';

class SavedSolutions extends Component {
  static propTypes = {
    applicationShowGame: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    editorSelectSolution: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    notifierAddNotfication: PropTypes.func.isRequired,
    solutions: PropTypes.array.isRequired,
    solutionsAddSaved: PropTypes.func.isRequired,
    solutionsUpdateSaved: PropTypes.func.isRequired,
    solutionsRemoveSaved: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  };

  componentWillMount() {
    const {
      notifierAddNotfication,
      solutionsAddSaved,
      solutionsUpdateSaved,
      solutionsRemoveSaved,
      userId,
    } = this.props;

    this.solutionsRef = database().ref(`solutions/${userId}`);

    this.solutionsRef.on('child_added',
      (result) => solutionsAddSaved({ solution: result.val() }),
      (error) => notifierAddNotfication({ notification: error.message }));

    this.solutionsRef.on('child_changed',
      (result) => solutionsUpdateSaved({ solution: result.val() }),
      (error) => notifierAddNotfication({ notification: error.message }));

    this.solutionsRef.on('child_removed',
      (result) => solutionsRemoveSaved({ solution: result.val() }),
      (error) => notifierAddNotfication({ notification: error.message }));
  }

  componentWillUnmount() {
    this.solutionsRef.off();
  }

  handleDelete(solution) {
    const { userId } = this.props;

    database()
      .ref(`solutions/${userId}/${solution.id}`)
      .remove();
  }

  handleLoad({ content, id, title }) {
    const {
      applicationShowGame,
      editorSelectSolution,
    } = this.props;

    editorSelectSolution({ content, title, id });
    applicationShowGame();
  }

  handleSubmit(solution) {
    database()
      .ref('leaderboard')
      .push()
      .set(solution);
  }

  render() {
    const {
      avatar,
      username,
      applicationShowGame,
      isVisible,
      solutions,
    } = this.props;

    return (
      <AppContainer isVisible={ isVisible }>
        <AppPane>
          <AppSection>
            <Solutions>
              { solutions.map((solution) =>
                <Solution
                    avatar={ avatar }
                    average={ solution.average }
                    content={ solution.content }
                    id={ solution.id }
                    key={ solution.id }
                    lastModified={ solution.lastModified }
                    onDelete={ () => this.handleDelete(solution) }
                    onLoad={ () => this.handleLoad(solution) }
                    onSubmit={ () => this.handleSubmit(solution) }
                    points={ solution.points }
                    score={ solution.score }
                    title={ solution.title }
                    user={ username } />
              ) }
            </Solutions>
          </AppSection>

          <AppSection shrink={ true }>
            <Link onClick={ () => applicationShowGame() }>
              {'<'} Back to Game
            </Link>
          </AppSection>
        </AppPane>
      </AppContainer>
    );
  }
}

const solutionsSelector = createSelector(
  (state) => state.solutions.saved,
  (solutions) => Object.keys(solutions)
    .map((solutionId) => solutions[solutionId])
    .sort((a, b) => new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()),
);

export default connect((state) => ({
  avatar: state.user.avatar,
  solutions: solutionsSelector(state),
  userId: state.user.id,
  username: state.user.username,
}), {
  applicationShowGame,
  editorSelectSolution,
  notifierAddNotfication,
  solutionsAddSaved,
  solutionsUpdateSaved,
  solutionsRemoveSaved,
})(SavedSolutions);
