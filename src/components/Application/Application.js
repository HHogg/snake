import 'normalize.css/normalize.css';
import 'open-color/open-color.css';
import './Application.css';

import React, { Component, PropTypes } from 'react';
import { Route } from 'react-router-dom';
import { auth } from 'firebase';
import About from '../About';
import AbsoluteContainer from '../Layout/AbsoluteContainer';
import Flex from '../Flex/Flex';
import Game from '../Game';
import Intro from '../Intro';
import Leaderboard from '../Leaderboard';
import MainMenu from '../MainMenu';
import Notifications from '../Notifications';
import RoutingAnimation from '../RoutingAnimation/RoutingAnimation';
import SavedSolutions from '../SavedSolutions';
import UserMenu from '../UserMenu';

export default class Application extends Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    onLogin: PropTypes.func.isRequired,
  };

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
  }

  render() {
    const { location } = this.props;
    const { pathname } = location;
    const key = pathname.split('/')[1] || '/';

    return (
      <Flex container direction="vertical">
        <Flex shrink>
          <Notifications>
            <Flex container alignChildrenVertical="middle">
              <Flex>
                <MainMenu />
              </Flex>

              <Flex shrink>
                <UserMenu />
              </Flex>
            </Flex>
          </Notifications>
        </Flex>

        <AbsoluteContainer container>
          <RoutingAnimation
              component={ Flex }
              container
              direction="vertical"
              location={ location }
              transitionKey={ key }>
            <Route path="/" exact component={ Intro } />
            <Route path="/game" component={ Game } />
            <Route path="/about" component={ About } />
            <Route path="/leaderboard" component={ Leaderboard } />
            <Route path="/solutions" component={ SavedSolutions } />
          </RoutingAnimation>
        </AbsoluteContainer>
      </Flex>
    );
  }
}
