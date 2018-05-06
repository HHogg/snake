import PropTypes from 'prop-types';
import { cloneElement, Children, Component } from 'react';
import { auth, database } from 'firebase';
import { connect } from 'react-redux';
import {
  notifierAddErrorNotification,
  notifierAddSuccessNotification,
} from '../../store/notifier';
import { userLoginSuccessful } from '../../store/user';

const provider = new auth.GithubAuthProvider();

class GithubAuthenticationLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onErrorNotification: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onSuccessNotification: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authenticating: false,
    };
  }

  handleOnClick() {
    const { authenticating } = this.state;
    const { onLogin, onErrorNotification, onSuccessNotification } = this.props;

    if (authenticating) {
      return;
    }

    this.setState({ authenticating: true });
    auth().signInWithPopup(provider).then((result) =>
      database()
        .ref(`users/${result.user.uid}`)
        .update({
          avatar: result.user.photoURL,
          displayName: result.user.displayName,
        }).then(() => {
          onLogin({
            id: result.user.uid,
            avatar: result.user.photoURL,
            displayName: result.user.displayName,
          });
          onSuccessNotification(`You are now signed in with GitHub.
            Get yourself up on the Leaderboard!`);
        })
    ).catch((error) => {
      this.setState({ authenticating: false });
      onErrorNotification(`GitHub signin failed: ${error}`);
    });
  }

  render() {
    return cloneElement(Children.only(this.props.children), {
      onClick: () => this.handleOnClick(),
    });
  }
}

export default connect(() => ({}), {
  onErrorNotification: notifierAddErrorNotification,
  onLogin: userLoginSuccessful,
  onSuccessNotification: notifierAddSuccessNotification,
})(GithubAuthenticationLink);
