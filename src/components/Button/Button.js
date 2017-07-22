import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Button.css';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['gray', 'red', 'green', 'blue', 'yellow']).isRequired,
    shrink: PropTypes.bool,
  };

  render() {
    const { children, color, shrink, ...rest } = this.props;
    const classes = classnames('sh-button', `sh-button--${color}`, {
      'sh-button--shrink': shrink,
    });

    return (
      <button { ...rest } className={ classes }>
        { children }
      </button>
    );
  }
}
