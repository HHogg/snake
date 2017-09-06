import { connect } from 'react-redux';
import { applicationShowSavedSolutions } from '../../store/application';
import {
  notifierAddErrorNotification,
  notifierAddSuccessNotification,
} from '../../store/notifier';
import { userLoginSuccessful } from '../../store/user';
import GithubAuthenticationLink from './GithubAuthenticationLink';

export default connect((state) => ({
  avatar: state.user.avatar,
  displayName: state.user.displayName,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsActive: state.application.savedSolutions,
}), {
  onErrorNotification: notifierAddErrorNotification,
  onLogin: userLoginSuccessful,
  onShowSavedSolutions: applicationShowSavedSolutions,
  onSuccessNotification: notifierAddSuccessNotification,
})(GithubAuthenticationLink);
