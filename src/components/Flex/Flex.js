import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Flex.css';

export default class Flex extends Component {
  static propTypes = {
    centerChildren: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    shrink: PropTypes.bool,
  };

  static defaultProps = {
    direction: 'horizontal',
  };

  render() {
    const {
      centerChildren,
      children,
      className,
      container,
      direction,
      shrink,
    } = this.props;

    const classes = classnames('sh-flex', {
      'sh-flex--container': container,
      'sh-flex--shrink': shrink,
      'sh-flex--center-children': centerChildren,
      [`sh-flex--${direction}`]: container && direction,
    }, className);

    return (
      <div className={ classes }>
        { children }
      </div>
    );
  }
}
