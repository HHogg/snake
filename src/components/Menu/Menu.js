import React, { Component } from 'react';
import './Menu.css';

export default class Menu extends Component {
  render() {
    return (
      <div { ...this.props } className="sh-menu" />
    );
  }
}
