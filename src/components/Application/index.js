import { connect } from 'react-redux';
import { applicationShowGame } from '../../store/application';
import { notifierRemoveNotification } from '../../store/notifier';
import { uiSkipIntro } from '../../store/ui';
import { userLoginSuccessful } from '../../store/user';
import Application from './Application';

export default connect((state) => ({
  isAboutActive: state.application.about,
  isGameActive: state.application.game,
  isLeaderboardActive: state.application.leaderboard,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsActive: state.application.savedSolutions,
  notifications: state.notifier.notifications,
  skipIntro: state.ui.skipIntro,
}), {
  onLogin: userLoginSuccessful,
  onRemoveNotification: notifierRemoveNotification,
  onShowGame: applicationShowGame,
  onSkipIntro: uiSkipIntro,
})(Application);

