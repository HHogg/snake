import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Buttons, Flex, Icon } from 'preshape';

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
      <Flex direction="horizontal" gutter="x3">
        <Flex direction="horizontal" grow>
          <Buttons grow>
            <Button
                color="positive"
                disabled={ isGameOver || isPlaying }
                onClick={ () => onStart() }
                title="Start the game">
              Start
            </Button>
          </Buttons>
        </Flex>

        <Flex direction="horizontal" grow>
          <Buttons grow>
            <Button
                disabled={ !canGoBackwards || !isPlaying || isRunning }
                onClick={ () => onStepBackwards() }
                title="Rewind one cell at a time">
              <Icon name="Beginning" size="1rem" />
            </Button>

            <Button
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onPlay() }
                title="Run the solution and move Snake">
              <Icon name="Play" size="1rem" />
            </Button>

            <Button
                disabled={ isGameOver || !isPlaying || !isRunning }
                onClick={ () => onPause() }
                title="Pause the solution from being run">
              <Icon name="Pause" size="1rem" />
            </Button>

            <Button
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onStepForwards() }
                title="Move the cell snake forward one cell at a time">
              <Icon name="End" size="1rem" />
            </Button>
          </Buttons>
        </Flex>

        <Flex direction="horizontal" grow>
          <Buttons grow>
            <Button
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onRefresh() }
                title="Rerun the solution with the current snakes position">
              <Icon name="Refresh" size="1rem" />
            </Button>
          </Buttons>
        </Flex>

        <Flex direction="horizontal">
          <Buttons>
            <Button
                color="negative"
                disabled={ !isPlaying }
                onClick={ () => onReset() }
                title="Reset the Snake back to starting position">
              Reset
            </Button>
          </Buttons>
        </Flex>
      </Flex>
    );
  }
}
