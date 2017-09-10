import React, { Component, PropTypes } from 'react';
import { Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './RoutingAnimation.css';

const timeout = { enter: 800, exit: 400 };

export default class RoutingAnimation extends Component {
  static propTypes = {
    animation: PropTypes.oneOf(['fade']),
    children: PropTypes.node.isRequired,
    location: PropTypes.object.isRequired,
    transitionKey: PropTypes.string.isRequired,
  };

  static defaultProps = {
    animation: 'fade',
  };

  render() {
    const {
      animation,
      children,
      location,
      transitionKey,
      ...rest
    } = this.props;

    return (
      <TransitionGroup { ...rest }>
        <CSSTransition
            classNames={ `sh-routing-animation-${animation}-` }
            key={ transitionKey }
            timeout={ timeout }>
          <Switch location={ location }>
            { children }
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}
