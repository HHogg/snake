import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './Text.css';

const ComponentMap  ={
  small: 'div',
  medium: 'h2',
  large: 'h1',
};

export default class Text extends Component {
  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(['light', 'dark']),
    inline: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    space: PropTypes.oneOf(['x1', 'x2', 'x4']),
    subtle: PropTypes.bool,
    strong: PropTypes.bool,
    weak: PropTypes.bool,
  };

  static defaultProps = {
    size: 'small',
  };

  render() {
    const {
      className,
      color,
      inline,
      size,
      space,
      subtle,
      strong,
      weak,
      ...rest
    } = this.props;

    const Component = inline ? 'span' : ComponentMap[size];
    const classes = classnames(className, 'sh-text', `sh-text--${size}`, {
      'sh-text--block': !inline,
      'sh-text--strong': strong,
      'sh-text--subtle': subtle,
      'sh-text--weak': weak,
      [`sh-text--color-${color}`]: color,
      [`sh-text--space-${space}`]: space,
    });

    return (
      <Component { ...rest } className={ classes } />
    );
  }
}
