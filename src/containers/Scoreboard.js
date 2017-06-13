import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ScoreTile from '../components/ScoreTile/ScoreTile';
import ScoreTiles from '../components/ScoreTile/ScoreTiles';

class Scoreboard extends Component {
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
        <ScoreTile label="Average" value={ Math.floor(average) } />
        <ScoreTile label="Score" value={ Math.floor(score) } />
      </ScoreTiles>
    );
  }
}

export default connect((state) => ({
  average: state.game.average,
  points: state.game.points,
  score: state.game.score,
}))(Scoreboard);
