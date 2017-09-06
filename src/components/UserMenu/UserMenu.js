import React, { Component, PropTypes } from 'react';
import GithubAuthenticationLink from '../GithubAuthenticationLink';
import Link from '../Link/Link';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import UserAvatar from '../UserAvatar/UserAvatar';

export default class UserMenu extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    isSavedSolutionsActive: PropTypes.bool.isRequired,
    onShowSavedSolutions: PropTypes.func.isRequired,
  };

  render() {
    const {
      avatar,
      displayName,
      isLoggedIn,
      isSavedSolutionsActive,
      onShowSavedSolutions,
    } = this.props;

    return (
      <Menu style={ { minHeight: 'var(--user-avatar__size)' } }>
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
            <GithubAuthenticationLink />
          </MenuItem>
        ) }
      </Menu>
    );
  }
}
