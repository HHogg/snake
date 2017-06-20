import React, { Component, PropTypes } from 'react';
import './Solutions.css';

export default class Solutions extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <div className="sh-solutions">
        { children }
      </div>
    );
  }
}
