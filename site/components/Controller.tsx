import * as React from 'react';
import { useMatchMedia, Button, Buttons, Flex, Icon } from 'preshape';
import { getCompletedHistory, SnakeContext } from '@hhogg/snake';

export default () => {
  const {
    history,
    isStarted,
    isRunning,
    onPause,
    onPlay,
    onRefresh,
    onReset,
    onStart,
    onStepBackwards,
    onStepForwards,
  } = React.useContext(SnakeContext);

  const isAtBeginning = history[0] && !history[0].path.length;
  const match = useMatchMedia(['600px']);

  React.useEffect(() => {
    if (!isRunning) {
      console.log(getCompletedHistory(history));
    }
  }, [isRunning]);

  return (
    <Flex
        direction={ match('600px') ? 'horizontal' : 'vertical' }
        gap="x3">
      <Flex direction="horizontal" grow>
        <Buttons grow>
          <Button
              color="positive"
              disabled={ isStarted }
              onClick={ () => onStart() }
              title="Start the game">
            Start
          </Button>
        </Buttons>
      </Flex>

      <Flex direction="horizontal" grow>
        <Buttons grow joined>
          <Button
              disabled={ isAtBeginning || !isStarted || isRunning }
              onClick={ () => onStepBackwards() }
              title="Rewind one cell at a time">
            <Icon name="Beginning" size="1rem" />
          </Button>

          <Button
              disabled={ !isStarted || isRunning }
              onClick={ () => onPlay() }
              title="Run the solution and move Snake">
            <Icon name="Play" size="1rem" />
          </Button>

          <Button
              disabled={ !isStarted || !isRunning }
              onClick={ () => onPause() }
              title="Pause the solution from being run">
            <Icon name="Pause" size="1rem" />
          </Button>

          <Button
              disabled={ !isStarted || isRunning }
              onClick={ () => onStepForwards() }
              title="Move the cell snake forward one cell at a time">
            <Icon name="End" size="1rem" />
          </Button>

          <Button
              disabled={ !isStarted || isRunning }
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
              disabled={ !isStarted }
              onClick={ () => onReset() }
              title="Reset the Snake back to starting position">
            Reset
          </Button>
        </Buttons>
      </Flex>
    </Flex>
  );
};
