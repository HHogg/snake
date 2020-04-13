export default {
  name: '🌀Hamiltonian Cycle',
  average: 76,
  points: 195,
  score: 4303,
  content: `const DIR_U = 0;
const DIR_R = 1;
const DIR_D = 2;
const DIR_L = 3;

const getDirection = (a, b) =>
  (a[1] === b[1] && a[0] === b[0] - 1 && DIR_R) ||
  (a[0] === b[0] && a[1] === b[1] - 1 && DIR_D) ||
  (a[1] === b[1] && a[0] === b[0] + 1 && DIR_L) ||
  (a[0] === b[0] && a[1] === b[1] + 1 && DIR_U);

/**
 * The heuristic function will be run on every cell, and should return a number. The number that is returned will be used to determine the path of the snake.
 *
 * @param [number, number] cell Coordinates of the cell to return a value for
 * @param number xLength The number of cells across the x axis
 * @param number yLength The number of cells across the y axis
 * @param [number, number][] snake Coordinates of the position of the snake from head to tail. E.g. [[4, 1], [3, 1]]
 * @param [number, number] point Coordinates of the point.
 *
 * @returns number The value for the cell
 */
function heuristic(cell, xLength, yLength, snake, point) {
  const xMax = xLength - 1;
  const yMax = yLength - 1;
  const [headX, headY] = snake[0];
  const dirCell = getDirection(snake[0], cell);
  const dirCurrent = getDirection(snake[1], snake[0]);

  if (dirCurrent === DIR_R) {
    // Continuing sweep movement
    if ((headX < xMax - 1 || headY === yMax) && dirCell === dirCurrent) return 0;

    // Moving onto the next row when approaching the edge
    if (headX >= xMax - 1 && dirCell === DIR_D) return 0;
  }

  if (dirCurrent === DIR_L) {
    // Continuing sweep movement
    if ((headX > 1 || headY === yMax) && dirCell === dirCurrent) return 0;

    // Moving onto the next row when approaching the edge
    if (headX <= 1 && dirCell === DIR_D) return 0;
  }

  if (dirCurrent === DIR_R || dirCurrent === DIR_L) {
    // When at the bounds on the last line, head back up
    if ((headX === 0 || headX === xMax) && headY === yMax && dirCell === DIR_U) return 0;
  }

  if (dirCurrent === DIR_D) {
    // After moving onto the next line, get the next direction
    if ((headX < xLength / 2 && dirCell === DIR_R)) return 0;
    if ((headX > xLength / 2 && dirCell === DIR_L)) return 0;
  }

  if (dirCurrent === DIR_U) {
    // Continue moving back up to the top of the border
    if (dirCell === DIR_U) return 0;

    // After returning to the top, set the direction to continue sweeping
    if ((headY === 0 || headY === yMax) && headX === 0 && (dirCell === DIR_L || dirCell === DIR_R)) return 0;
  }

  return 999;
}`,
};
