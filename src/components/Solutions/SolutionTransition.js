import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

export default class SolutionTransition extends Component {
  render() {
    return (
      <CSSTransition { ...this.props }
          classNames="sh-solution__transition"
          timeout={ 200 } />
    );
  }
}
