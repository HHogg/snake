import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class AppSection extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shrink: PropTypes.bool,
  };

  render() {
    const { children, shrink, ...rest } = this.props;
    const classes = classnames('sh-app__section', {
      'sh-app__section--shrink': shrink,
    });

    return (
      <div { ...rest } className={ classes }>
        { children }
      </div>
    );
  }
}
