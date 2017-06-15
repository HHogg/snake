import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import GithubAuthenticationButton from './GithubAuthenticationButton';

class UserMenu extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    username: PropTypes.string,
  };

  render() {
    const { avatar, isLoggedIn, username } = this.props;

    if (!isLoggedIn) {
      return (
        <GithubAuthenticationButton />
      );
    }

    return (
      <UserAvatar
          name={ username }
          src={ avatar } />
    );
  }
}

export default connect((state) => ({
  avatar: state.user.avatar,
  isLoggedIn: !!state.user.accessToken,
  username: state.user.username,
}), {

})(UserMenu);
