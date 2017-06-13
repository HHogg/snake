import React, { Component, PropTypes } from 'react';

export default class AppHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div { ...rest } className="sh-app__header">
        { children }
      </div>
    );
  }
}
