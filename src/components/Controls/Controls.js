import React, { Component, PropTypes } from 'react';
import './Controls.css';

export default class Controls extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="sh-controls">
        { this.props.children }
      </div>
    );
  }
}
