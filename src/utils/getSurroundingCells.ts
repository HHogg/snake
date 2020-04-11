import { TypeCell, TypeSnake } from '../Types';
import containsCoordinates from './containsCell';
import isInBounds from './isInBounds';

export default (xLength: number, yLength: number, snake: TypeSnake) => {
  const cells: TypeCell[] = [
    [snake[0][0], snake[0][1] - 1],
    [snake[0][0] + 1, snake[0][1]],
    [snake[0][0], snake[0][1] + 1],
    [snake[0][0] - 1, snake[0][1]],
  ];

  return cells.filter((cell) => isInBounds(xLength, yLength, cell) &&
    !containsCoordinates(snake.slice(0, -1), cell));
};
