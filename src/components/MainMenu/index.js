import { connect } from 'react-redux';
import {
  applicationShowAbout,
  applicationShowGame,
  applicationShowLeaderboard,
} from '../../store/application';
import MainMenu from './MainMenu';

export default connect((state) => ({
  isAboutActive: state.application.about,
  isGameActive: state.application.game,
  isLeaderboardActive: state.application.leaderboard,
}), {
  onShowAbout: applicationShowAbout,
  onShowGame: applicationShowGame,
  onShowLeaderboard: applicationShowLeaderboard,
})(MainMenu);
