import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import {
  Application,
  ApplicationDetails,
  ApplicationFooter,
  ApplicationTitle,
  Flex,
  Icon,
  Menu,
  MenuItem,
  SwitchTransition,
} from 'preshape';
import { userLoginSuccessful } from '../store/user';
import About from './About/About';
import Game from './Game';
import Leaderboard from './Leaderboard';
import Notifications from './Notifications';
import SavedSolutions from './SavedSolutions';
import SignIn from './Auth/SignIn';
import SignOut from './Auth/SignOut';
import UserAvatar from './UserAvatar';

export const widthMedium = '64rem';
export const widthSmall = '48rem';

class Root extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
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
    const { isLoggedIn } = this.props;

    return (
      <Application gutter="x3" padding="x3" theme="night">
        <Notifications />
        <ApplicationTitle>
          <Flex
              alignChildrenVertical="middle"
              direction="horizontal"
              gutter="x8">
            <Flex grow>
              <Menu>
                <MenuItem exact to="/">Play</MenuItem>
                <MenuItem to="/about">About</MenuItem>
                <MenuItem to="/leaderboard">Leaderboard</MenuItem>
              </Menu>
            </Flex>

            <Flex>
              <Menu>
                { !isLoggedIn && (
                  <SignIn>
                    <MenuItem>
                      <Flex
                          alignChildrenVertical="middle"
                          direction="horizontal"
                          gutter="x2">
                        <Flex>
                          Sign in with Github
                        </Flex>
                        <Flex>
                          <Icon name="Github" size="1rem" />
                        </Flex>
                      </Flex>
                    </MenuItem>
                  </SignIn>
                ) }

                { isLoggedIn && (
                  <Fragment>
                    <MenuItem to="/solutions">My Saved Solutions</MenuItem>
                    <SignOut>
                      <MenuItem>
                        <Flex
                            alignChildrenVertical="middle"
                            direction="horizontal"
                            gutter="x2">
                          <Flex>Sign out</Flex>
                          <Flex><UserAvatar size="1rem" /></Flex>
                        </Flex>
                      </MenuItem>
                    </SignOut>
                  </Fragment>
                ) }
              </Menu>
            </Flex>
          </Flex>
        </ApplicationTitle>

        <SwitchTransition Component={ Flex } direction="vertical" grow>
          <Route component={ Game } exact path="/" />
          <Route component={ About } path="/about" />
          <Route component={ Leaderboard } path="/leaderboard" />
          <Route component={ SavedSolutions } path="/solutions" />
        </SwitchTransition>

        <ApplicationFooter padding="x0">
          <ApplicationDetails
              alignChildrenHorizontal="end"
              github="https://github.com/HHogg/snake-heuristics" />
        </ApplicationFooter>
      </Application>
    );
  }
}

export default withRouter(connect((state) => ({
  isLoggedIn: !!state.user.id,
}), {
  onLogin: userLoginSuccessful,
})(Root));
