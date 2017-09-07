import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import Solutions from './Solutions';

export default class SolutionTransitionGroup extends Component {
  render() {
    return (
      <TransitionGroup { ...this.props } component={ Solutions } />
    );
  }
}
