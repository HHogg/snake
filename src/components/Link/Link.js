import React, { Component } from 'react';
import './Link.css';

export default class Link extends Component {
  render() {
    return (
      <a { ...this.props } className="sh-link" target="_blank" />
    );
  }
}
