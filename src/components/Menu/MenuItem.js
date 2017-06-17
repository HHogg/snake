import React, { Component } from 'react';

export default class MenuItem extends Component {
  render() {
    return (
      <div { ...this.props } className="sh-menu__item" />
    );
  }
}
