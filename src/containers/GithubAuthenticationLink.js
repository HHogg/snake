import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import { applicationShowSavedSolutions } from '../store/application';
import { userLoginSuccessful } from '../store/user';
import Link from '../components/Link/Link';

const provider = new auth.GithubAuthProvider();

class GithubAuthenticationLink extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    displayName: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired,
    isSavedSolutionsActive: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
    onShowSavedSolutions: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authenticating: false,
    };
  }

  handleOnClick() {
    const { authenticating } = this.state;
    const { onLogin } = this.props;

    if (authenticating) {
      return;
    }

    this.setState({ authenticating: true });
    auth().signInWithPopup(provider).then((result) => {
      onLogin({
        id: result.user.uid,
        avatar: result.user.photoURL,
        displayName: result.user.displayName,
      });
    }).catch(() => {
      this.setState({ authenticating: false });
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

export default connect((state) => ({
  avatar: state.user.avatar,
  displayName: state.user.displayName,
  isLoggedIn: !!state.user.id,
  isSavedSolutionsActive: state.application.savedSolutions,
}), {
  onLogin: userLoginSuccessful,
  onShowSavedSolutions: applicationShowSavedSolutions,
})(GithubAuthenticationLink);
