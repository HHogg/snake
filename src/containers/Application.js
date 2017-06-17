import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import App from '../components/App/App';
import AppBody from '../components/App/AppBody';
import AppHeader from '../components/App/AppHeader';
import AppPane from '../components/App/AppPane';
import AppTitle from '../components/App/AppTitle';
import Game from './Game';
import Leaderboard from './Leaderboard';
import SavedSolutions from './SavedSolutions';
import UserMenu from './UserMenu';

class Application extends Component {
  static propTypes = {
    isGameVisible: PropTypes.bool.isRequired,
    isLeaderboardVisible: PropTypes.bool.isRequired,
    isSavedSolutionsVisible: PropTypes.bool.isRequired,
  };

  render() {
    const {
      isGameVisible,
      isLeaderboardVisible,
      isSavedSolutionsVisible,
    } = this.props;

    return (
      <App>
        <AppHeader>
          <AppPane>
            <AppTitle>Snake Heuristics</AppTitle>
          </AppPane>

          <AppPane shrink={ true }>
            <UserMenu />
          </AppPane>
        </AppHeader>

        <AppBody>
          <Game isVisible={ isGameVisible } />
          <Leaderboard isVisible={ isLeaderboardVisible } />
          <SavedSolutions isVisible={ isSavedSolutionsVisible } />
        </AppBody>
      </App>
    );
  }
}

export default connect((state) => ({
  isGameVisible: state.application.game,
  isLeaderboardVisible: state.application.leaderboard,
  isSavedSolutionsVisible: state.application.savedSolutions,
}), {

})(Application);
