import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ScoreTile from './ScoreTile';
import ScoreTiles from './ScoreTiles';

export default class Scoreboard extends Component {
  static propTypes = {
    average: PropTypes.number,
    points: PropTypes.number,
    score: PropTypes.number,
  };

  static defaultProps = {
    average: 0,
    points: 0,
    score: 0,
  };

  render() {
    const { average, points, score } = this.props;

    return (
      <ScoreTiles>
        <ScoreTile label="Points" value={ points } />
        <ScoreTile label="Average" value={ Math.floor(average) } />
        <ScoreTile label="Score" value={ Math.floor(score) } />
      </ScoreTiles>
    );
  }
}
