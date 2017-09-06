import React, { Component, PropTypes } from 'react';
import './ScoreTiles.css';

export default class ScoreTiles extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className="sh-score-tiles">
        { this.props.children }
      </div>
    );
  }
}
