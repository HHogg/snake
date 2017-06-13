import React, { Component, PropTypes } from 'react';
import './App.css';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children, ...rest } = this.props;

    return (
      <div { ...rest } className="sh-app">
        { children }
      </div>
    );
  }
}
