import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectGameHistory } from '../../store/game';
import calculateAverage from '../../../functions/common/calculateAverage';
import calculateScore from '../../../functions/common/calculateScore';
import Scoreboard from './Scoreboard';

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
  (xMax, yMax, average, points, tails) => tails.reduce((score) =>
    score + calculateScore(
      (xMax * yMax),
      average,
      points,
    ), 0),
);

export default connect((state) => ({
  average: selectAverage(state),
  points: selectPoints(state),
  score: selectScore(state),
}))(Scoreboard);
