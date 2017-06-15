import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { auth } from 'firebase';
import { userLoginSuccessful } from '../store/user';
import ButtonGroup from '../components/Button/ButtonGroup';
import Button from '../components/Button/Button';

const provider = new auth.GithubAuthProvider();

class GithubAuthenticationButton extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool,
    userLoginSuccessful: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      authenticating: false,
    };
  }

  handleOnClick() {
    const { userLoginSuccessful } = this.props;

    this.setState({ authenticating: true });
    auth().signInWithPopup(provider).then((result) => {
      userLoginSuccessful({
        accessToken: result.credential.accessToken,
        avatar: result.additionalUserInfo.profile.avatar_url,
        username: result.additionalUserInfo.username,
      });
    }).catch(() => {
      this.setState({ authenticating: false });
    });
  }

  render() {
    const { authenticating } = this.state;

    return (
      <ButtonGroup>
        <Button
            color="gray"
            disabled={ authenticating }
            onClick={ () => this.handleOnClick() }>
          Sign in with Github
        </Button>
      </ButtonGroup>
    );
  }
}

export default connect((state) => ({

}), {
  userLoginSuccessful,
})(GithubAuthenticationButton);
