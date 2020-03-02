import { Cell, Snake } from '../Types';
import containsCoordinates from './containsCell';
import isInBounds from './isInBounds';

export default (snake: Snake) => {
  const cells: Cell[] = [
    [snake[0][0], snake[0][1] - 1],
    [snake[0][0] + 1, snake[0][1]],
    [snake[0][0], snake[0][1] + 1],
    [snake[0][0] - 1, snake[0][1]],
  ];

  return cells.filter((cell) => isInBounds(cell) &&
    !containsCoordinates(snake.slice(0, -1), cell));
};
