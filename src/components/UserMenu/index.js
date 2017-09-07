import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserMenu from './UserMenu';

export default withRouter(connect((state) => ({
  avatar: state.user.avatar,
  displayName: state.user.displayName,
  isLoggedIn: !!state.user.id,
}), {})(UserMenu));
