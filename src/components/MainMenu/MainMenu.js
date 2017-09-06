import React, { Component, PropTypes } from 'react';
import Link from '../Link/Link';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';

export default class MainMenu extends Component {
  static propTypes = {
    isAboutActive: PropTypes.bool.isRequired,
    isGameActive: PropTypes.bool.isRequired,
    isLeaderboardActive: PropTypes.bool.isRequired,
    onShowAbout: PropTypes.func.isRequired,
    onShowGame: PropTypes.func.isRequired,
    onShowLeaderboard: PropTypes.func.isRequired,
  };

  render() {
    const {
      isAboutActive,
      isGameActive,
      isLeaderboardActive,
      onShowAbout,
      onShowGame,
      onShowLeaderboard,
    } = this.props;

    return (
      <Menu style={ { minHeight: 'var(--user-avatar__size)' } }>
        <MenuItem active={ isGameActive }>
          <Link onClick={ () => onShowGame() }>
            Play
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
      </Menu>
    );
  }
}
