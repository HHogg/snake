import React, { Component, PropTypes } from 'react';
import './AppTitle.css';

export default class AppTitle extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div { ...rest } className="sh-app-title">
        { children }
      </div>
    );
  }
}
