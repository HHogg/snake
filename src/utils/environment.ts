import { IEnvironment, TypeCell, TypeSnake } from '../Types';
import containsCell from './containsCell';

export const createSnake = (xLength: number, yLength: number): TypeSnake =>
  Array.from({ length: 4 }, (_, i) => [
    Math.floor(xLength / 2) - i,
    Math.floor(yLength / 2),
  ]);

export const createPoint = (xLength: number, yLength: number, snake: TypeSnake): undefined | TypeCell => {
  const freeGrid = Array
    .from({ length: xLength * yLength })
    .map<[number, number]>((_, i) => [i % xLength, Math.floor(i / yLength)])
    .filter((cell) => !containsCell(snake, cell));

  return freeGrid.length
    ? freeGrid[Math.floor(Math.random() * (freeGrid.length - 1))]
    : undefined;
};

export const createEnvironment = (xLength: number, yLength: number, snake: TypeSnake = createSnake(xLength, yLength)): IEnvironment => {
  const point = createPoint(xLength, yLength, snake);
  return { snake, point };
};
