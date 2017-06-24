import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AppTitle from '../components/AppTitle/AppTitle';
import Flex from '../components/Flex/Flex';
import Page from '../components/Page/Page';
import Pages from '../components/Page/Pages';
import About from './About';
import Game from './Game';
import Leaderboard from './Leaderboard';
import SavedSolutions from './SavedSolutions';
import Menu from './Menu';

class Application extends Component {
  static propTypes = {
    isAboutActive: PropTypes.bool.isRequired,
    isGameActive: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLeaderboardActive: PropTypes.bool.isRequired,
    isSavedSolutionsActive: PropTypes.bool.isRequired,
  };

  render() {
    const {
      isAboutActive,
      isGameActive,
      isLeaderboardActive,
      isLoggedIn,
      isSavedSolutionsActive,
    } = this.props;

    return (
      <Flex container direction="vertical">
        <Flex shrink>
          <Menu />
        </Flex>

        <Flex container>
          <Pages>
            <Page active={ isAboutActive }>
              <About />
            </Page>

            <Page active={ isGameActive }>
              <Game />
            </Page>

            <Page active={ isLeaderboardActive }>
              <Leaderboard />
            </Page>

            { isLoggedIn && (
              <Page active={ isSavedSolutionsActive }>
                <SavedSolutions />
              </Page>
            ) }
          </Pages>
        </Flex>
      </Flex>
    );
  }
}

export default connect((state) => ({
  isAboutActive: state.application.about,
  isGameActive: state.application.game,
  isLeaderboardActive: state.application.leaderboard,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsActive: state.application.savedSolutions,
}), {})(Application);
