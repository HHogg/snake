import React, { Component, PropTypes } from 'react';
import Button from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import Controls from './Controls';
import ControlGroup from './ControlGroup';
import Icon from '../Icon/Icon';

export default class Controller extends Component {
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
