import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isVisible: PropTypes.bool,
  };

  render() {
    const { children, isVisible, ...rest } = this.props;
    const classes = classnames('sh-app__container', {
      'sh-app__container--visible': isVisible,
    });

    return (
      <div { ...rest } className={ classes }>
        { children }
      </div>
    );
  }
}
