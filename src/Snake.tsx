import * as React from 'react';
import SolutionRunner from './SolutionRunner';
import { TypeCell, TypeHistory, TypePoint, TypeSnake, TypeValues } from './Types';
import { createBlock, moveForwards, moveBackwards } from './utils/history';
import getSurroundingCells from './utils/getSurroundingCells';
import isCellIncluded from './utils/isCellIncluded';

interface Props {
  solution: string;
  timeout?: number;
  worker: Worker;
  xLength?: number;
  yLength?: number;
}

export const SnakeContext = React.createContext<{
  history: TypeHistory;
  isStarted: boolean;
  isRunning: boolean;
  logs: string[];
  onClearLog: () => void;
  onPause: () => void;
  onPlay: () => void;
  onRefresh: () => void;
  onReset: () => void;
  onStart: () => void;
  onStepBackwards: () => void;
  onStepForwards: () => void;
  point: undefined | TypePoint;
  snake: undefined | TypeSnake;
  values: undefined | TypeValues;
  xLength: number;
  yLength: number;
}>({
  history: [],
  isStarted: false,
  isRunning: false,
  logs: [],
  onClearLog: () => {},
  onPause: () => {},
  onPlay: () => {},
  onRefresh: () => {},
  onReset: () => {},
  onStart: () => {},
  onStepBackwards: () => {},
  onStepForwards: () => {},
  point: undefined,
  snake: undefined,
  values: undefined,
  xLength: 15,
  yLength: 15,
});

const Snake: React.FC<Props> = (props) => {
  const {
    solution,
    timeout = 1000,
    worker,
    xLength = 15,
    yLength = 15,
    ...rest
  } = props;

  const refAnimationFrame = React.useRef<number>();
  const refSolutionRunner = React.useRef<SolutionRunner>();
  const [isStarted, setIsStarted] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);
  const [history, setHistory] = React.useState<TypeHistory>([]);
  const [logs, setLogs] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<TypeValues>();

  const level = history[history.length - 1];
  const snake = level && level.snake;
  const point = level && level.point;

  const handleReset = () => {
    if (refAnimationFrame.current) {
      cancelAnimationFrame(refAnimationFrame.current);
    }

    setIsStarted(false);
    setIsRunning(false);
    setValues(undefined);
    setHistory([]);
  };

  const handleLog = (log: string) => {
    setLogs([log, ...logs]);
  };

  const runSolution = React.useCallback(() => {
    if (point && snake) {
      refSolutionRunner.current?.run({
        fn: solution,
        env: {
          xMax: xLength,
          yMax: yLength,
          snake: snake,
          point: point,
        },
      });
    }
  }, [solution, point, snake]);

  const moveSnake = React.useCallback(() => {
    if (!Array.isArray(values)) {
      setIsRunning(false);

      return handleLog('🔥 There were no heuristic values to calculate a move 🔥');
    }

    if (!snake || !point) {
      setIsRunning(false);

      return handleLog('Press start!');
    }

    const cells = getSurroundingCells(xLength, yLength, snake);
    let nextValue;
    let nextCell: TypeCell | undefined;

    for (let i = 0; i < cells.length; i++) {
      if (nextValue === undefined || values[cells[i][1]][cells[i][0]] < nextValue) {
        nextValue = values[cells[i][1]][cells[i][0]];
        nextCell = cells[i];
      }
    }

    if (!nextCell) {
      setIsRunning(false);

      return handleLog('The 🐍 did not reach the point. There were no valid cells to move to.');
    }

    if (isCellIncluded([nextCell], point) && snake) {
      setHistory(createBlock(xLength, yLength, moveForwards(history, nextCell, true)));

      if (snake.length - 1 === (xLength * yLength)) {
        setIsRunning(false);
        handleLog('🎉 You have conquered Snake! 🎉');
      }
    } else {
      setHistory(moveForwards(history, nextCell));
    }
  }, [values, snake, point]);

  React.useEffect(() => {
    refSolutionRunner.current = new SolutionRunner({ timeout, worker });

    return () => {
      refSolutionRunner.current?.destroy();
    };
  }, [timeout, worker]);

  React.useEffect(() => {
    if (refSolutionRunner.current) {
      refSolutionRunner.current.onMessage = ({ values }) => {
        if (isStarted) {
          setValues(values);
        }
      };

      refSolutionRunner.current.onError = ({ message }) => {
        setIsRunning(false);
        handleLog(message);
      };

      if (!isStarted) {
        refSolutionRunner.current.reset();
      }
    }
  }, [isStarted, isRunning]);

  React.useEffect(() => {
    if (!point || !snake) {
      setValues(undefined);
      setHistory(createBlock(xLength, yLength, history));
    }
  }, [point, snake]);

  React.useEffect(() => {
    if (isStarted) {
      runSolution();
    }
  }, [isStarted, point, snake]);

  React.useEffect(() => {
    if (isRunning && values) {
      refAnimationFrame.current = requestAnimationFrame(() => {
        moveSnake();
      });
    }
  }, [isRunning, values]);

  return (
    <SnakeContext.Provider { ...rest } value={ {
      history: history,
      isRunning: isRunning,
      isStarted: isStarted,
      logs: logs,
      onClearLog: () => setLogs([]),
      onPause: () => setIsRunning(false),
      onPlay: () => setIsRunning(true),
      onRefresh: () => runSolution(),
      onReset: () => handleReset(),
      onStart: () => setIsStarted(true),
      onStepBackwards: () => setHistory(moveBackwards(history)),
      onStepForwards: () => moveSnake(),
      point: point,
      snake: snake,
      values: values,
      xLength: xLength,
      yLength: yLength,
    } } />
  );
};

export default Snake;
