import { TypeCell, TypeHistory, TypeHistoryBlock } from '../Types';
import { createEnvironment } from './environment';

export const manipulateHistory = (history: TypeHistory, n: number, predicate: (block: TypeHistoryBlock) => null | TypeHistoryBlock): TypeHistory => {
  const entry = predicate(history[n]);

  return entry
    ? [...history.slice(0, n), entry, ...history.slice(n + 1)]
    : [...history.slice(0, n), ...history.slice(n + 1)];
};

export const createBlock = (xSize: number, ySize: number, history: TypeHistory) =>
  manipulateHistory(history, history.length, () => [
    createEnvironment(xSize, ySize, history[history.length - 1] && [
      history[history.length - 1][0].point as TypeCell,
      ...history[history.length - 1][0].snake,
    ]),
    [],
  ]);

export const moveForwards = (history: TypeHistory, cell: TypeCell, pop?: boolean) =>
  manipulateHistory(history, history.length - 1, ([{ point, snake }, path]) => [
    { point: point, snake: [cell, ...snake].slice(0, pop ? -1 : undefined) },
    pop ? [snake.slice(-1)[0], ...path] : path,
  ]);

export const moveBackwards = (history: TypeHistory) =>
  manipulateHistory(history, history.length - 1, ([{ point, snake }, path]) =>
    path.length > 0
      ? [{ point: point, snake: [...snake.slice(1), path[0]] }, path.slice(1)]
      : null);
