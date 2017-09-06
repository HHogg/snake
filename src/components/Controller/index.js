import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  gamePauseGame,
  gamePlayGame,
  gameStartGame,
  selectGameHistory,
} from '../../store/game';
import Controller from './Controller';

const canGoBackwardsSelector = createSelector(
  selectGameHistory,
  (h) => !!h[0] && h[0][2].length > 0,
);

export default connect((state) => ({
  canGoBackwards: canGoBackwardsSelector(state),
  isGameOver: state.game.isGameOver,
  isPlaying: state.game.isPlaying,
  isRunning: state.game.isRunning,
}), {
  onPause: gamePauseGame,
  onPlay: gamePlayGame,
  onStart: gameStartGame,
})(Controller);
