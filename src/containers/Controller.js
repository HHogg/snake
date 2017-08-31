import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  gamePauseGame,
  gamePlayGame,
  gameStartGame,
  selectGameHistory,
} from '../store/game';
import Button from '../components/Button/Button';
import ButtonGroup from '../components/Button/ButtonGroup';
import Controls from '../components/Controls/Controls';
import ControlGroup from '../components/Controls/ControlGroup';
import Icon from '../components/Icon/Icon';

class Controller extends Component {
  static propTypes = {
    canGoBackwards: PropTypes.bool.isRequired,
    isGameOver: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired,
    onStepBackwards: PropTypes.func.isRequired,
    onStepForwards: PropTypes.func.isRequired,
  };

  render() {
    const {
      canGoBackwards,
      isGameOver,
      isPlaying,
      isRunning,
      onPause,
      onPlay,
      onRefresh,
      onReset,
      onStart,
      onStepBackwards,
      onStepForwards,
    } = this.props;

    return (
      <Controls>
        <ControlGroup>
          <ButtonGroup>
            <Button
                color="green"
                disabled={ isGameOver || isPlaying }
                onClick={ () => onStart() }
                title="Start the game">
              Start
            </Button>
          </ButtonGroup>
        </ControlGroup>

        <ControlGroup>
          <ButtonGroup>
            <Button
                color="blue"
                disabled={ !canGoBackwards || !isPlaying || isRunning }
                onClick={ () => onStepBackwards() }
                title="Rewind one cell at a time">
              <Icon name="step-backwards" />
            </Button>

            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onPlay() }
                title="Run the solution and move Snake">
              <Icon name="play" />
            </Button>

            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || !isRunning }
                onClick={ () => onPause() }
                title="Pause the solution from being run">
              <Icon name="pause" />
            </Button>

            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onStepForwards() }
                title="Move the cell snake forward one cell at a time">
              <Icon name="step-forwards" />
            </Button>
          </ButtonGroup>
        </ControlGroup>

        <ControlGroup>
          <ButtonGroup>
            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onRefresh() }
                title="Rerun the solution with the current snakes position">
              <Icon name="refresh" />
            </Button>
          </ButtonGroup>
        </ControlGroup>

        <ControlGroup>
          <ButtonGroup>
            <Button
                color="red"
                disabled={ !isPlaying }
                onClick={ () => onReset() }
                title="Reset the Snake back to starting position">
              Reset
            </Button>
          </ButtonGroup>
        </ControlGroup>
      </Controls>
    );
  }
}

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
