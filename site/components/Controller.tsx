import * as React from 'react';
import { useMatchMedia, Button, Buttons, Box, Icon, Tooltip } from 'preshape';
import { SnakeContext } from '@hhogg/snake';

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

  return (
    <Box
        flex={ match('600px') ? 'horizontal' : 'vertical' }
        gap="x3">
      <Box flex="horizontal" grow>
        <Buttons grow>
          <Button
              color="positive"
              disabled={ isStarted }
              onClick={ () => onStart() }
              title="Start the game">
            Start
          </Button>
        </Buttons>
      </Box>

      <Box flex="horizontal" grow>
        <Buttons grow joined>
          <Tooltip content="Step Backward">
            { (props) => (
              <Button { ...props }
                  disabled={ isAtBeginning || !isStarted || isRunning }
                  onClick={ () => onStepBackwards() }>
                <Icon name="Beginning" size="1rem" />
              </Button>
            ) }
          </Tooltip>

          <Tooltip content="Play">
            { (props) => (
              <Button { ...props }
                  disabled={ !isStarted || isRunning }
                  onClick={ () => onPlay() }>
                <Icon name="Play" size="1rem" />
              </Button>
            ) }
          </Tooltip>

          <Tooltip content="Pause">
            { (props) => (
              <Button { ...props }
                  disabled={ !isStarted || !isRunning }
                  onClick={ () => onPause() }>
                <Icon name="Pause" size="1rem" />
              </Button>
            ) }
          </Tooltip>

          <Tooltip content="Step forward">
            { (props) => (
              <Button { ...props }
                  disabled={ !isStarted || isRunning }
                  onClick={ () => onStepForwards() }>
                <Icon name="End" size="1rem" />
              </Button>
            ) }
          </Tooltip>

          <Tooltip content="Refresh values">
            { (props) => (
              <Button { ...props }
                  disabled={ !isStarted || isRunning }
                  onClick={ () => onRefresh() }>
                <Icon name="Refresh" size="1rem" />
              </Button>
            ) }
          </Tooltip>
        </Buttons>
      </Box>

      <Box flex="horizontal" grow>
        <Buttons grow>
          <Button
              color="negative"
              disabled={ !isStarted }
              onClick={ () => onReset() }
              title="Reset the Snake back to starting position">
            Reset
          </Button>
        </Buttons>
      </Box>
    </Box>
  );
};
