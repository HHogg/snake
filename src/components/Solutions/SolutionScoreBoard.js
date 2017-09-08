import React, { Component, PropTypes } from 'react';
import ScoreTile from '../Scoreboard/ScoreTile';
import ScoreTiles from '../Scoreboard/ScoreTiles';

export default class SolutionScoreBoard extends Component {
  static propTypes = {
    average: PropTypes.number.isRequired,
    points: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  };

  render() {
    const { average, points, score } = this.props;

    return (
      <ScoreTiles>
        <ScoreTile label="Points" value={ points } />
        <ScoreTile label="Average" value={ +average.toFixed() } />
        <ScoreTile label="Score" value={ +score.toFixed() } />
      </ScoreTiles>
    );
  }
}
