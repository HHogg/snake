import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Flex.css';

export default class Flex extends Component {
  static propTypes = {
    alignChildrenHorizontal: PropTypes.oneOf(['start', 'middle', 'end', 'around', 'between']),
    alignChildrenVertical: PropTypes.oneOf(['start', 'middle', 'end', 'around', 'between']),
    alignSelf: PropTypes.oneOf(['start', 'middle', 'end']),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    container: PropTypes.bool,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    full: PropTypes.bool,
    padding: PropTypes.oneOf(['x1', 'x2', 'x3', 'x4', 'x6']),
    shrink: PropTypes.bool,
    space: PropTypes.oneOf(['x0', 'x1', 'x2', 'x3', 'x4', 'x6']),
  };

  static defaultProps = {
    direction: 'horizontal',
    space: 'x2',
  };

  render() {
    const {
      alignChildrenHorizontal,
      alignChildrenVertical,
      alignSelf,
      children,
      className,
      container,
      direction,
      full,
      padding,
      shrink,
      space,
      ...rest
    } = this.props;

    const classes = classnames('sh-flex', {
      'sh-flex--container': container,
      'sh-flex--full': full,
      'sh-flex--shrink': shrink,
      [`sh-flex--${direction}`]: container && direction,
      [`sh-flex--align-horz-${alignChildrenHorizontal}`]: alignChildrenHorizontal,
      [`sh-flex--align-self-${alignSelf}`]: alignSelf,
      [`sh-flex--align-vert-${alignChildrenVertical}`]: alignChildrenVertical,
      [`sh-flex--padding-${padding}`]: padding,
      [`sh-flex--space-${space}`]: container && space,
    }, className);

    return (
      <div { ...rest } className={ classes }>
        { children }
      </div>
    );
  }
}
