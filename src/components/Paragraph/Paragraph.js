import React, { Component, PropTypes } from 'react';
import './Paragraph.css';

export default class Paragraph extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <p className="sh-paragraph">{ children }</p>
    );
  }
}
