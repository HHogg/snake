import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Button.css';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    color: PropTypes.oneOf(['gray', 'red', 'green', 'blue']).isRequired,
  };

  render() {
    const { children, color, ...rest } = this.props;
    const classes = classnames('sh-button', `sh-button--${color}`);

    return (
      <button { ...rest } className={ classes }>
        { children }
      </button>
    );
  }
}
