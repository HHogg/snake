import PropTypes from 'prop-types';
import { cloneElement, Children, Component } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import { notifierAddSuccessNotification } from '../../store/notifier';
import { userLogoutSuccessful } from '../../store/user';

class SignOut extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onLogout: PropTypes.func.isRequired,
    onSuccessNotification: PropTypes.func.isRequired,
  };

  handleOnClick() {
    auth().signOut().then(() => {
      this.props.onLogout();
      this.props.onSuccessNotification('You have sign out.');
    });
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      onClick: () => this.handleOnClick(),
    });
  }
}

export default connect(() => ({}), {
  onLogout: userLogoutSuccessful,
  onSuccessNotification: notifierAddSuccessNotification,
})(SignOut);
