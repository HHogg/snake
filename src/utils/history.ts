import { Cell, History, HistoryBlock } from '../Types';
import { createEnvironment } from './createEnvironment';

export const manipulateHistory = (history: History, n: number, predicate: (block: HistoryBlock) => null | HistoryBlock): History => {
  const entry = predicate(history[n]);

  return entry
    ? [...history.slice(0, n), entry, ...history.slice(n + 1)]
    : [...history.slice(0, n), ...history.slice(n + 1)];
};

export const createBlock = (history: History) =>
  manipulateHistory(history, history.length, () => [
    createEnvironment(history[history.length - 1] && [
      history[history.length - 1][0].point as Cell,
      ...history[history.length - 1][0].snake,
    ]),
    [],
  ]);

export const moveForwards = (history: History, cell: Cell, pop?: boolean) =>
  manipulateHistory(history, history.length - 1, ([{ point, snake }, path]) => [
    { point: point, snake: [cell, ...snake].slice(0, pop ? -1 : undefined) },
    pop ? [snake.slice(-1)[0], ...path] : path,
  ]);

export const moveBackwards = (history: History) =>
  manipulateHistory(history, history.length - 1, ([{ point, snake }, path]) =>
    path.length > 0
      ? [{ point: point, snake: [...snake.slice(1), path[0]] }, path.slice(1)]
      : null);
