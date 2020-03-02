import * as React from 'react';
import { Flex } from 'preshape';
import { Cell, History, Values } from '../Types';
import { CANVAS_SIZE } from '../config';
import containsCell from '../utils/containsCell';
import getSurroundingCells from '../utils/getSurroundingCells';
import { createBlock, moveForwards, moveBackwards } from '../utils/history';
import Sandbox from '../utils/Sandbox';
import Canvas from './Canvas';
import Console from './Console';
import Controller from './Controller';
import { RootContext } from './Root';
import Scoreboard from './Scoreboard';

const sandbox = new Sandbox();

export default () => {
  const refAnimationFrame = React.useRef<number>();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [history, setHistory] = React.useState<History>([]);
  const [values, setValues] = React.useState<null | Values>(null);
  const [consoleMessages, setConsoleMessages] = React.useState<string[]>([]);
  const { content } = React.useContext(RootContext);

  const level = history[history.length - 1];
  const snake = level && level[0].snake;
  const point = level && level[0].point;

  const consoleLog = (message: string) => {
    setConsoleMessages([message, ...consoleMessages]);
  };

  const handleGeneratePoint = () => {
    setHistory(createBlock(history));
  };

  const handleMoveSnakeBackwards = () => {
    setHistory(moveBackwards(history));
  };

  const handleMoveSnakeForwards = (cell: Cell) => {
    setHistory(moveForwards(history, cell, true));
  };

  const handleStopGame = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    if (refAnimationFrame.current) {
      cancelAnimationFrame(refAnimationFrame.current);
    }

    setIsPlaying(false);
    setIsRunning(false);
    setValues(null);
    setHistory([]);
  };

  const run = React.useCallback(() => {
    if (point && snake) {
      sandbox.run({
        fn: content,
        env: {
          xMax: CANVAS_SIZE,
          yMax: CANVAS_SIZE,
          snake: snake,
          point: point,
        },
      });
    }
  }, [content, point, snake]);

  const move = React.useCallback(() => {
    if (!Array.isArray(values)) {
      handleStopGame();

      return consoleLog('🔥 There were no heuristic values to calculate a move 🔥');
    }

    if (!snake || !point) {
      handleStopGame();

      return consoleLog('Press start!');
    }

    const cells = getSurroundingCells(snake);
    let nextValue;
    let nextCell: [number, number] | undefined;

    for (let i = 0; i < cells.length; i++) {
      if (nextValue === undefined || values[cells[i][1]][cells[i][0]] < nextValue) {
        nextValue = values[cells[i][1]][cells[i][0]];
        nextCell = cells[i];
      }
    }

    if (!nextCell) {
      handleStopGame();

      return consoleLog('The 🐍 did not reach the point. There were no valid cells to move to.');
    }


    if (containsCell([nextCell], point) && snake) {
      handleGeneratePoint();

      if (snake.length - 1 === (CANVAS_SIZE * CANVAS_SIZE)) {
        handleStopGame();
        consoleLog('🎉 You have conquered Snake! 🎉 Submit your solution to the solutions file on Github.');
      }
    } else {
      handleMoveSnakeForwards(nextCell);
    }
  }, [values, snake, point]);

  React.useEffect(() => {
    sandbox.onMessage = ({ values }) => {
      if (isPlaying) {
        setValues(values);
      }
    };

    sandbox.onError = ({ message }) => {
      setIsRunning(false);
      consoleLog(message);
    };

    if (!isPlaying) {
      sandbox.reset();
    }
  }, [isPlaying, isRunning]);

  React.useEffect(() => {
    if (!point || !snake) {
      setValues(null);
      handleGeneratePoint();
    }
  }, [point, snake]);

  React.useEffect(() => {
    if (isPlaying) {
      run();
    }
  }, [isPlaying, point, snake]);

  React.useEffect(() => {
    if (isRunning && values) {
      refAnimationFrame.current = requestAnimationFrame(() => {
        move();
      });
    }
  }, [isRunning, values]);

  return (
    <Flex
        direction="horizontal"
        gap="x4"
        grow>
      <Flex
          basis="none"
          direction="vertical"
          gap="x2"
          grow>
        <Flex
            basis="none"
            direction="vertical"
            grow
            minHeight="20rem">
          <Canvas
              point={ point }
              snake={ snake }
              values={ values } />
        </Flex>

        <Flex direction="horizontal">
          <Console
              messages={ consoleMessages }
              onConsoleClear={ () => setConsoleMessages([]) } />
        </Flex>

        <Flex>
          <Scoreboard
              history={ history } />
        </Flex>

        <Flex>
          <Controller
              canGoBackwards={ history[0] && history[0][1].length > 0 }
              isGameOver={ false }
              isPlaying={ isPlaying }
              isRunning={ isRunning }
              onPause={ () => setIsRunning(false) }
              onPlay={ () => setIsRunning(true) }
              onRefresh={ () => run() }
              onReset={ () => handleReset() }
              onStart={ () => setIsPlaying(true) }
              onStepBackwards={ () => handleMoveSnakeBackwards() }
              onStepForwards={ () => move() } />
        </Flex>
      </Flex>
    </Flex>
  );
};
