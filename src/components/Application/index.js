import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { userLoginSuccessful } from '../../store/user';
import Application from './Application';

export default withRouter(connect(() => ({}), {
  onLogin: userLoginSuccessful,
})(Application));

