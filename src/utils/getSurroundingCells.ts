import { TypeCell, TypeSnake } from '../Types';
import isCellIncluded from './isCellIncluded';
import isCellInbounds from './isCellInbounds';

export default (xLength: number, yLength: number, snake: TypeSnake) => {
  const cells: TypeCell[] = [
    [snake[0][0], snake[0][1] - 1],
    [snake[0][0] + 1, snake[0][1]],
    [snake[0][0], snake[0][1] + 1],
    [snake[0][0] - 1, snake[0][1]],
  ];

  return cells.filter((cell) => isCellInbounds(xLength, yLength, cell) &&
    !isCellIncluded(snake.slice(0, -1), cell));
};
