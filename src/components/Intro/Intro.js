import React, { Component, PropTypes } from 'react';
import AbsoluteChild from '../Layout/AbsoluteChild';
import SnakeHeuristicsSVG from './SnakeHeuristicsSVG';
import './Intro.css';

export default class Intro extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { history } = this.props;

    this.redirect = window.setTimeout(() => {
      history.push('/game');
    }, 4500);
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.clearTimeout(this.redirect);
    }
  }

  render() {
    return (
      <AbsoluteChild type="center">
        <div style={ { width: '30rem', maxWidth: '100%' } }>
          <SnakeHeuristicsSVG />
        </div>
      </AbsoluteChild>
    );
  }
}
