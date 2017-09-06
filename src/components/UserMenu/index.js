import { connect } from 'react-redux';
import { applicationShowSavedSolutions } from '../../store/application';
import UserMenu from './UserMenu';

export default connect((state) => ({
  avatar: state.user.avatar,
  displayName: state.user.displayName,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsActive: state.application.savedSolutions,
}), {
  onShowSavedSolutions: applicationShowSavedSolutions,
})(UserMenu);
