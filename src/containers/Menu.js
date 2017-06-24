import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import {
  applicationShowAbout,
  applicationShowGame,
  applicationShowLeaderboard,
  applicationShowSavedSolutions,
} from '../store/application';
import { userLoginSuccessful } from '../store/user';
import Link from '../components/Link/Link';
import Menu from '../components/Menu/Menu';
import MenuItem from '../components/Menu/MenuItem';
import UserAvatar from '../components/UserAvatar/UserAvatar';

const provider = new auth.GithubAuthProvider();

class MenuC extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    isAboutActive: PropTypes.bool.isRequired,
    isGameActive: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    isLeaderboardActive: PropTypes.bool.isRequired,
    isSavedSolutionsActive: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onShowAbout: PropTypes.func.isRequired,
    onShowGame: PropTypes.func.isRequired,
    onShowLeaderboard: PropTypes.func.isRequired,
    onShowSavedSolutions: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authenticating: false,
    };
  }

  componentWillMount() {
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

  handleOnClick() {
    const { authenticating } = this.state;
    const { onLogin } = this.props;

    if (authenticating) {
      return;
    }

    this.setState({ authenticating: true });
    auth().signInWithPopup(provider).then((result) => {
      onLogin({
        id: result.user.uid,
        avatar: result.user.photoURL,
        displayName: result.user.displayName,
      });
    }).catch(() => {
      this.setState({ authenticating: false });
    });
  }

  render() {
    const {
      avatar,
      displayName,
      isAboutActive,
      isGameActive,
      isLeaderboardActive,
      isLoggedIn,
      isSavedSolutionsActive,
      onShowAbout,
      onShowGame,
      onShowLeaderboard,
      onShowSavedSolutions,
    } = this.props;

    return (
      <Menu style={ { minHeight: 'var(--user-avatar__size)' } }>
        <MenuItem active={ isGameActive }>
          <Link onClick={ () => onShowGame() }>
            Snake Heuristics
          </Link>
        </MenuItem>

        <MenuItem active={ isAboutActive }>
          <Link onClick={ () => onShowAbout() }>
            About
          </Link>
        </MenuItem>

        <MenuItem active={ isLeaderboardActive }>
          <Link onClick={ () => onShowLeaderboard() }>
            Leaderboard
          </Link>
        </MenuItem>

        { isLoggedIn && (
          <MenuItem active={ isSavedSolutionsActive }>
            <Link onClick={ () => onShowSavedSolutions() }>
              My Saved Solutions
            </Link>
          </MenuItem>
        ) }

        { isLoggedIn && (
          <MenuItem>
            <UserAvatar
                name={ displayName }
                src={ avatar } />
          </MenuItem>
        ) }

        { !isLoggedIn && (
          <MenuItem>
            <Link onClick={ () => this.handleOnClick() }>
              Sign in with Github
            </Link>
          </MenuItem>
        ) }
      </Menu>
    );
  }
}

export default connect((state) => ({
  avatar: state.user.avatar,
  displayName: state.user.displayName,
  isAboutActive: state.application.about,
  isGameActive: state.application.game,
  isLeaderboardActive: state.application.leaderboard,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsActive: state.application.savedSolutions,
}), {
  onLogin: userLoginSuccessful,
  onShowAbout: applicationShowAbout,
  onShowGame: applicationShowGame,
  onShowLeaderboard: applicationShowLeaderboard,
  onShowSavedSolutions: applicationShowSavedSolutions,
})(MenuC);
