import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SignInRequired extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn && !this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children;
    }

    return null;
  }
}

export default withRouter(connect(({ user }) => ({
  isLoggedIn: !!user.id,
}))(SignInRequired));
