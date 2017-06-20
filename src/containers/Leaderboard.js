import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { database } from 'firebase';
import { applicationShowGame } from '../store/application';
import { notifierAddNotfication } from '../store/notifier';
import {
  solutionsAddLeaderboard,
  solutionsUpdateLeaderboard,
  solutionsRemoveLeaderboard,
} from '../store/solutions';
import AppContainer from '../components/App/AppContainer';
import AppPane from '../components/App/AppPane';
import AppSection from '../components/App/AppSection';
import Link from '../components/Link/Link';

class Leaderboard extends Component {
  static propTypes = {
    applicationShowGame: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired,
    notifierAddNotfication: PropTypes.func.isRequired,
    solutionsAddLeaderboard: PropTypes.func.isRequired,
    solutionsUpdateLeaderboard: PropTypes.func.isRequired,
    solutionsRemoveLeaderboard: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {
      notifierAddNotfication,
      solutionsAddLeaderboard,
      solutionsUpdateLeaderboard,
      solutionsRemoveLeaderboard,
    } = this.props;

    // this.solutionsRef = database()
    //   .ref('leaderboard')
    //   .orderByChild('points')
    //   .limitToFirst(20);

    // this.solutionsRef.on('child_added',
    //   (result) => solutionsAddLeaderboard({ solution: result.val() }),
    //   (error) => notifierAddNotfication({ notification: error.message }));

    // this.solutionsRef.on('child_changed',
    //   (result) => solutionsUpdateLeaderboard({ solution: result.val() }),
    //   (error) => notifierAddNotfication({ notification: error.message }));

    // this.solutionsRef.on('child_removed',
    //   (result) => solutionsRemoveLeaderboard({ solution: result.val() }),
    //   (error) => notifierAddNotfication({ notification: error.message }));
  }

  componentWillUnmount() {
    // this.solutionsRef.off();
  }

  render() {
    const { applicationShowGame, isVisible } = this.props;

    return (
      <AppContainer isVisible={ isVisible }>
        <AppPane>
          <AppSection>
            Leaderboard
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

export default connect((state) => ({
  solutions: state.solutions.leaderboard,
}), {
  applicationShowGame,
  notifierAddNotfication,
  solutionsAddLeaderboard,
  solutionsUpdateLeaderboard,
  solutionsRemoveLeaderboard,
})(Leaderboard);
