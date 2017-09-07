import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class AbsoluteChild extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['center', 'full']).isRequired,
  };

  render() {
    const { children, type, ...rest } = this.props;
    const classes = classnames('sh-absolute__child', `sh-absolute__child--${type}`);

    return (
      <div { ...rest } className={ classes }>
        { children }
      </div>
    );
  }
}
