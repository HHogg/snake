import React, { Component, PropTypes } from 'react';
import { auth, database } from 'firebase';
import Link from '../Link/Link';

const provider = new auth.GithubAuthProvider();

export default class GithubAuthenticationLink extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    isSavedSolutionsActive: PropTypes.bool.isRequired,
    onErrorNotification: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onShowSavedSolutions: PropTypes.func.isRequired,
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
    return (
      <Link onClick={ () => this.handleOnClick() }>
        Sign in with Github
      </Link>
    );
  }
}
