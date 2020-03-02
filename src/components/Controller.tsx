import * as React from 'react';
import { useMatchMedia, Button, Buttons, Flex, Icon } from 'preshape';

interface Props {
  canGoBackwards: boolean;
  isGameOver: boolean;
  isPlaying: boolean;
  isRunning: boolean;
  onPause: () => void;
  onPlay: () => void;
  onRefresh: () => void;
  onReset: () => void;
  onStart: () => void;
  onStepBackwards: () => void;
  onStepForwards: () => void;
}

export default (props: Props) => {
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
  } = props;

  const match = useMatchMedia(['600px']);

  return (
    <Flex
        direction={ match('600px') ? 'horizontal' : 'vertical' }
        gap="x3">
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
        <Buttons grow joined>
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

          <Button
              disabled={ isGameOver || !isPlaying || isRunning }
              onClick={ () => onRefresh() }
              title="Rerun the solution with the current snakes position">
            <Icon name="Refresh" size="1rem" />
          </Button>
        </Buttons>
      </Flex>

      <Flex direction="horizontal" grow>
        <Buttons grow>
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
};
