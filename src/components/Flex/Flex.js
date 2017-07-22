import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Flex.css';

export default class Flex extends Component {
  static propTypes = {
    alignSelf: PropTypes.oneOf(['end']),
    centerChildren: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    priority: PropTypes.string,
    shrink: PropTypes.bool,
  };

  static defaultProps = {
    direction: 'horizontal',
  };

  render() {
    const {
      alignSelf,
      centerChildren,
      children,
      className,
      container,
      direction,
      priority,
      shrink,
    } = this.props;

    const classes = classnames('sh-flex', {
      'sh-flex--container': container,
      'sh-flex--shrink': shrink,
      'sh-flex--center-children': centerChildren,
      'sh-flex--align-self--end': alignSelf === 'end',
      [`sh-flex--${direction}`]: container && direction,
    }, className);

    const style = {
      flexGrow: priority,
    };

    return (
      <div className={ classes } style={ style }>
        { children }
      </div>
    );
  }
}
