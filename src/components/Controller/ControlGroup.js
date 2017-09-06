import React, { Component, PropTypes } from 'react';

export default class ControlGroup extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="sh-control-group">
        { this.props.children }
      </div>
    );
  }
}
