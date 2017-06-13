import containsCoordinates from './containsCoordinates';
import isInBounds from './isInBounds';

export default (snake, xMax, yMax) =>
  [
    [snake[0][0], snake[0][1] - 1],
    [snake[0][0] + 1, snake[0][1]],
    [snake[0][0], snake[0][1] + 1],
    [snake[0][0] - 1, snake[0][1]],
  ].filter((cell) =>
    isInBounds(xMax, yMax, cell) && !containsCoordinates(snake, cell)
  );
