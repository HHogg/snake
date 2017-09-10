import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Flex.css';

export default class Flex extends Component {
  static propTypes = {
    alignChildrenHorizontal: PropTypes.oneOf(['start', 'middle', 'end', 'around', 'between']),
    alignChildrenVertical: PropTypes.oneOf(['start', 'middle', 'end', 'around', 'between']),
    alignSelf: PropTypes.oneOf(['start', 'middle', 'end']),
    children: PropTypes.node.isRequired,
    container: PropTypes.bool,
    className: PropTypes.string,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    maxWidth: PropTypes.oneOf(['small', 'medium', 'large']),
    padding: PropTypes.oneOf(['x1', 'x2', 'x3', 'x4', 'x6']),
    parent: PropTypes.bool,
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
      maxWidth,
      parent,
      direction,
      padding,
      shrink,
      space,
      ...rest
    } = this.props;

    const classes = classnames('sh-flex', {
      'sh-flex--container': container,
      'sh-flex--parent': parent,
      'sh-flex--shrink': shrink,
      [`sh-flex--${direction}`]: parent && direction,
      [`sh-flex--align-horz-${alignChildrenHorizontal}`]: alignChildrenHorizontal,
      [`sh-flex--align-self-${alignSelf}`]: alignSelf,
      [`sh-flex--align-vert-${alignChildrenVertical}`]: alignChildrenVertical,
      [`sh-flex--max-width-${maxWidth}`]: maxWidth,
      [`sh-flex--padding-${padding}`]: padding,
      [`sh-flex--space-${space}`]: parent && space,
    }, className);

    return (
      <div { ...rest } className={ classes }>
        { children }
      </div>
    );
  }
}
