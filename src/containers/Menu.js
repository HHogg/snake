import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  applicationShowAbout,
  applicationShowGame,
  applicationShowLeaderboard,
} from '../store/application';
import Link from '../components/Link/Link';
import Menu from '../components/Menu/Menu';
import MenuItem from '../components/Menu/MenuItem';

class MenuC extends Component {
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

export default connect((state) => ({
  isAboutActive: state.application.about,
  isGameActive: state.application.game,
  isLeaderboardActive: state.application.leaderboard,
}), {
  onShowAbout: applicationShowAbout,
  onShowGame: applicationShowGame,
  onShowLeaderboard: applicationShowLeaderboard,
})(MenuC);
