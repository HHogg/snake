import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { applicationShowSavedSolutions } from '../store/application';
import Link from '../components/Link/Link';
import Menu from '../components/Menu/Menu';
import MenuItem from '../components/Menu/MenuItem';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import GithubAuthenticationLink from './GithubAuthenticationLink';

class UserMenu extends Component {
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

export default connect((state) => ({
  avatar: state.user.avatar,
  displayName: state.user.displayName,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsActive: state.application.savedSolutions,
}), {
  onShowSavedSolutions: applicationShowSavedSolutions,
})(UserMenu);
