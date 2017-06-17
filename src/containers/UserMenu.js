import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import {
  applicationShowLeaderboard,
  applicationShowSavedSolutions,
} from '../store/application';
import { userLoginSuccessful } from '../store/user';
import Link from '../components/Link/Link';
import Menu from '../components/Menu/Menu';
import MenuItem from '../components/Menu/MenuItem';
import UserAvatar from '../components/UserAvatar/UserAvatar';

const provider = new auth.GithubAuthProvider();

class UserMenu extends Component {
  static propTypes = {
    applicationShowLeaderboard: PropTypes.func.isRequired,
    applicationShowSavedSolutions: PropTypes.func.isRequired,
    avatar: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string,
    userLoginSuccessful: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authenticating: false,
    };
  }

  handleOnClick() {
    const { authenticating } = this.state;
    const { userLoginSuccessful } = this.props;

    if (authenticating) {
      return;
    }

    this.setState({ authenticating: true });
    auth().signInWithPopup(provider).then((result) => {
      userLoginSuccessful({
        accessToken: result.credential.accessToken,
        avatar: result.additionalUserInfo.profile.avatar_url,
        username: result.additionalUserInfo.username,
      });
    }).catch(() => {
      this.setState({ authenticating: false });
    });
  }

  render() {
    const {
      applicationShowLeaderboard,
      applicationShowSavedSolutions,
      avatar,
      isLoggedIn,
      username,
    } = this.props;

    return (
      <Menu>
        <MenuItem>
          <Link onClick={ () => applicationShowLeaderboard() }>
            Leaderboard
          </Link>
        </MenuItem>

        { isLoggedIn && (
          <MenuItem>
            <Link onClick={ () => applicationShowSavedSolutions() }>
              My Saved Solutions
            </Link>
          </MenuItem>
        ) }

        { isLoggedIn && (
          <MenuItem>
            <UserAvatar
                name={ username }
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
  isLoggedIn: !!state.user.accessToken,
  username: state.user.username,
}), {
  applicationShowLeaderboard,
  applicationShowSavedSolutions,
  userLoginSuccessful,
})(UserMenu);
