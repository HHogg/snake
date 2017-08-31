import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectGameHistory } from '../store/game';
import ScoreTile from '../components/ScoreTile/ScoreTile';
import ScoreTiles from '../components/ScoreTile/ScoreTiles';
import calculateAverage from '../../functions/common/calculateAverage';
import calculateScore from '../../functions/common/calculateScore';

class Scoreboard extends Component {
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

const selectPoints = createSelector(
  selectGameHistory,
  (history) => history.length - 1,
);

const selectTails = createSelector(
  selectGameHistory,
  (history) => history.slice(0, -1).map(([,,t]) => t),
);

const selectAverage = createSelector(
  selectTails,
  (tails) => calculateAverage(tails)
);

const selectScore = createSelector(
  (state) => state.canvas.xMax,
  (state) => state.canvas.yMax,
  selectAverage,
  selectPoints,
  selectTails,
  (xMax, yMax, average, points, tails) => tails.reduce((score, tails) =>
    score + calculateScore(
      (xMax * yMax),
      average,
      tails.length,
      points,
    ), 0),
);

export default connect((state) => ({
  average: selectAverage(state),
  points: selectPoints(state),
  score: selectScore(state),
}))(Scoreboard);
