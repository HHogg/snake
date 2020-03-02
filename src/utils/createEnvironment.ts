import { Environment, Snake } from '../Types';
import { CANVAS_SIZE, SNAKE_LENGTH } from '../config';
import containsCoordinates from './containsCell';

export const createSnake = (): Snake =>
  Array.from({ length: SNAKE_LENGTH }, (_, i) => [
    Math.floor(CANVAS_SIZE / 2) - i,
    Math.floor(CANVAS_SIZE / 2),
  ]);

export const createPoint = (snake: Snake) => {
  try {
    const freeGrid = Array
      .from({ length: CANVAS_SIZE * CANVAS_SIZE })
      .map<[number, number]>((_, i) => [i % CANVAS_SIZE, Math.floor(i / CANVAS_SIZE)])
      .filter((cell) => !containsCoordinates(snake, cell));

    return freeGrid.length
      ? freeGrid[Math.floor(Math.random() * (freeGrid.length - 1))]
      : null;
  } catch (e) { /* */ }
};

export const createEnvironment = (snake: Snake = createSnake()): Environment => {
  const point = createPoint(snake);
  return { snake, point };
};
