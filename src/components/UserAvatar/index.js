import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserAvatar from './UserAvatar';

export default withRouter(connect((state) => ({
  src: state.user.avatar,
}), {})(UserAvatar));
