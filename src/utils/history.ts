import { IEnvironment, TypeCell, TypeHistory } from '../Types';
import { createEnvironment } from './environment';


export const manipulateHistory = (history: TypeHistory, n: number, predicate: (block: IEnvironment) => null | IEnvironment): TypeHistory => {
  const entry = predicate(history[n]);

  return entry
    ? [...history.slice(0, n), entry, ...history.slice(n + 1)]
    : [...history.slice(0, n), ...history.slice(n + 1)];
};

export const createBlock = (xSize: number, ySize: number, history: TypeHistory) =>
  manipulateHistory(history, history.length, () =>
    createEnvironment(xSize, ySize, history[history.length - 1] && history[history.length - 1].snake));

export const moveForwards = (history: TypeHistory, cell: TypeCell, extend?: boolean) =>
  manipulateHistory(history, history.length - 1, ({ path, point, snake }) => ({
    path: [snake.slice(-1)[0], ...path],
    point: point,
    snake: [cell, ...snake].slice(0, extend ? undefined : -1),
  }));

export const moveBackwards = (history: TypeHistory) =>
  manipulateHistory(history, history.length - 1, ({ path, point, snake }) =>
    path.length === 0 ? null : ({
      path: path.slice(1),
      point: point,
      snake: [...snake.slice(1), path[0]],
    }));
