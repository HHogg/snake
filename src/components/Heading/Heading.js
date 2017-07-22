import React, { Component, PropTypes } from 'react';
import './Heading.css';

export default class Heading extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <h1 className="sh-heading">{ children }</h1>
    );
  }
}
