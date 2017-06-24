import React, { Component, PropTypes } from 'react';

export default class Pages extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <div className="sh-pages">
        { children }
      </div>
    );
  }
}
