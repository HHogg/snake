import 'normalize.css/normalize.css';
import 'open-color/open-color.css';
import './Application.css';

import React, { Component, PropTypes } from 'react';
import { auth } from 'firebase';
import debounce from 'lodash.debounce';
import About from '../About';
import Flex from '../Flex/Flex';
import Game from '../Game';
import IntroModal from '../Intro/IntroModal';
import Leaderboard from '../Leaderboard';
import MainMenu from '../MainMenu';
import NotficationBar from '../Notifications/NotificationBar';
import Page from '../Page/Page';
import Pages from '../Page/Pages';
import SavedSolutions from '../SavedSolutions';
import UserMenu from '../UserMenu';

export default class Application extends Component {
  static propTypes = {
    isAboutActive: PropTypes.bool.isRequired,
    isGameActive: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLeaderboardActive: PropTypes.bool.isRequired,
    isSavedSolutionsActive: PropTypes.bool.isRequired,
    notifications: PropTypes.array.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRemoveNotification: PropTypes.func.isRequired,
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
      notifications,
      onRemoveNotification,
      onShowGame,
      onSkipIntro,
      skipIntro,
    } = this.props;

    return (
      <Flex container direction="vertical">
        <Flex shrink>
          <NotficationBar
              notifications={ notifications }
              onRemoveNotification={ onRemoveNotification } >
            <Flex container>
              <Flex>
                <MainMenu />
              </Flex>

              <Flex shrink>
                <UserMenu />
              </Flex>
            </Flex>
          </NotficationBar>
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
