import { SNAKE_LENGTH } from '../config';
import containsCoordinates from './containsCoordinates';

export const createSnake = (xMax, yMax) =>
  Array.from({ length: SNAKE_LENGTH }, (v, i) => [
    Math.floor(xMax / 2) - i,
    Math.floor(yMax / 2),
  ]);

export const createPoint = (xMax, yMax, snake) => {
  let point;

  while (!point || containsCoordinates(snake, point)) {
    point = [
      Math.floor(Math.random() * xMax),
      Math.floor(Math.random() * yMax),
    ];
  }

  return point;
};

export const createEnvironment = (xMax, yMax) => {
  const snake = createSnake(xMax, yMax);
  const point = createPoint(xMax, yMax, snake);

  return { snake, point };
};
