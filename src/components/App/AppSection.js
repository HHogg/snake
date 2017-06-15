import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class AppSection extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['end']),
    children: PropTypes.node.isRequired,
    shrink: PropTypes.bool,
  };

  render() {
    const { align, children, shrink, ...rest } = this.props;
    const classes = classnames('sh-app__section', {
      'sh-app__section--shrink': shrink,
      [`sh-app__section--${align}`]: align,
    });

    return (
      <div { ...rest } className={ classes }>
        { children }
      </div>
    );
  }
}
