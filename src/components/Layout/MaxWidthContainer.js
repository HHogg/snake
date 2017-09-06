import React, { Component, PropTypes } from 'react';
import './MaxWidthContainer.css';

export default class MaxWidthContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="sh-layout--max-width">
        { this.props.children }
      </div>
    );
  }
}
