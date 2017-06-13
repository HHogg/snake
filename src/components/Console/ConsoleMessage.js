import React, { Component, PropTypes } from 'react';

export default class ConsoleMessage extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <p className="sh-console__message">
        { this.props.children }
      </p>
    );
  }
}
