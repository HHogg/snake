import { connect } from 'react-redux';
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
}), {
  onErrorNotification: notifierAddErrorNotification,
  onLogin: userLoginSuccessful,
  onSuccessNotification: notifierAddSuccessNotification,
})(GithubAuthenticationLink);
