import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import debounce from 'lodash.debounce';
import Flex from '../components/Flex/Flex';
import IntroModal from '../components/Intro/IntroModal';
import Page from '../components/Page/Page';
import Pages from '../components/Page/Pages';
import { applicationShowGame } from '../store/application';
import { uiSkipIntro } from '../store/ui';
import { userLoginSuccessful } from '../store/user';
import About from './About';
import Game from './Game';
import Menu from './Menu';
import Leaderboard from './Leaderboard';
import SavedSolutions from './SavedSolutions';
import UserMenu from './UserMenu';


class Application extends Component {
  static propTypes = {
    isAboutActive: PropTypes.bool.isRequired,
    isGameActive: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLeaderboardActive: PropTypes.bool.isRequired,
    isSavedSolutionsActive: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onShowGame: PropTypes.func.isRequired,
    onSkipIntro: PropTypes.func.isRequired,
    skipIntro: PropTypes.bool.isRequired,
  };

  static childContextTypes = {
    registerResizeCanvas: PropTypes.func.isRequired,
    registerResizeEditor: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      registerResizeCanvas: (func) => this.resizeCanvas = func,
      registerResizeEditor: (func) => this.resizeEditor = func,
    };
  }

  componentDidMount() {
    const { onLogin } = this.props;

    auth().onAuthStateChanged((user) => {
      if (user) {
        onLogin({
          id: user.uid,
          avatar: user.photoURL,
          displayName: user.displayName,
        });
      }
    });

    window.addEventListener('resize', debounce(() => {
      this.resizeCanvas && this.resizeCanvas();
      this.resizeEditor && this.resizeEditor();
    }, 500));
  }

  render() {
    const {
      isAboutActive,
      isGameActive,
      isLeaderboardActive,
      isLoggedIn,
      isSavedSolutionsActive,
      onShowGame,
      onSkipIntro,
      skipIntro,
    } = this.props;

    return (
      <Flex container direction="vertical">
        <Flex container shrink>
          <Flex>
            <Menu />
          </Flex>

          <Flex shrink>
            <UserMenu />
          </Flex>
        </Flex>

        <Flex container>
          <Pages>
            <Page active={ isAboutActive }>
              <About onPlay={ onShowGame } />
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
          <IntroModal
              skipIntro={ skipIntro }
              onSkipIntro={ onSkipIntro } />
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
  skipIntro: state.ui.skipIntro,
}), {
  onLogin: userLoginSuccessful,
  onShowGame: applicationShowGame,
  onSkipIntro: uiSkipIntro,
})(Application);
