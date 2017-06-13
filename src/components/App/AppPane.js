import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class AppPane extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    shrink: PropTypes.bool,
  };

  render() {
    const { children, shrink, ...rest } = this.props;
    const classes = classnames('sh-app__pane', {
      'sh-app__pane--shrink': shrink,
    });

    return (
      <div { ...rest } className={ classes }>
        { children }
      </div>
    );
  }
}
