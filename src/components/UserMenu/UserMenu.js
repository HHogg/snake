import React, { Component, PropTypes } from 'react';
import GithubAuthenticationLink from '../GithubAuthenticationLink';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import UserAvatar from '../UserAvatar/UserAvatar';

export default class UserMenu extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
  };

  render() {
    const {
      avatar,
      displayName,
      isLoggedIn,
    } = this.props;

    return (
      <Menu>
        { isLoggedIn && (
          <MenuItem to="/solutions">
            My Saved Solutions
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
            <GithubAuthenticationLink />
          </MenuItem>
        ) }
      </Menu>
    );
  }
}
