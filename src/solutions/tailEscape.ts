export default {
  name: '🐕Tail escape',
  average: 29,
  points: 220,
  score: 22685,
  content: `/**
 * The heuristic function will be run on every cell, and should return a number. The number that is returned will be used to determine the path of the snake.
 *
 * @param [number, number] cell Coordinates of the cell to return a value for
 * @param number xLength The number of cells across the x axis
 * @param number yLength The number of cells across the y axis
 * @param [number, number][] snakeOrigin Coordinates of the position of the snake from head to tail. E.g. [[4, 1], [3, 1]]
 * @param [number, number] point Coordinates of the point.
 *
 * @returns number The value for the cell
 */
function heuristic(cell, xLength, yLength, snake, point) {
  const size = (xLength * yLength) * 2;
  const xMax = xLength - 1;
  const yMax = yLength - 1;

  if (!includes(adjacentes(snake[0], xMax, yMax), cell)) return 0;

  const pathToPoint = search(cell, point, xMax, yMax, snake);

  if (pathToPoint) {
    const snakeAtPoint = shift(snake, pathToPoint, true);

    for (const next of difference(adjacentes(point, xMax, yMax), snakeAtPoint)) {
      if (search(next, tail(snakeAtPoint), xMax, yMax, snakeAtPoint)) {
        return score(pathToPoint.length, cell, xMax, yMax, snake);
      }
    }
  }

  const pathToTail = search(cell, tail(snake), xMax, yMax, snake);

  if (pathToTail) {
    return score(size - pathToTail.length, cell, xMax, yMax, snake);
  }


  return size * 2;
}

const adjacentes = (a, xMax, yMax) => [[a[0], a[1] - 1], [a[0] + 1, a[1]], [a[0], a[1] + 1], [a[0] - 1, a[1]]].filter(b => b[0] >= 0 && b[1] >= 0 && b[0] <= xMax && b[1] <= yMax);
const includes = (a, b) => a.some((a) => equals(a, b));
const difference = (a, b) => a.filter((a) => !includes(b, a));
const distance = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
const equals = ([x1, y1], [x2, y2]) => x1 === x2 && y1 === y2;
const shift = (a, b, collect) => b.concat(a).slice(0, b.length + (a.length - b.length + (collect ? 1 : 0)));
const tail = (a) => a[a.length - 1];

const score = (n, cell, xMax, yMax, snake) =>
  (Math.random() * 0.25 + n) -
   (adjacentes(cell, xMax, yMax).some((a) =>
     includes(snake.slice(1), a)) ? 0.5 : 0);

const search = (start, end, xMax, yMax, snake) => {
  const queue = [start];
  const paths = { [start]: [start] };

  while (queue.length) {
    const current = queue.shift();
    const snakeShifted = shift(snake, paths[current] = paths[current] || [start]);

    if (equals(current, end)) {
      return paths[current];
    }

    for (const next of difference(adjacentes(current, xMax, yMax), snakeShifted)) {
      if (!(next in paths)) {
        queue.push(next);
        paths[next] = [next].concat(paths[current]);
      }
    }
  }
};`,
};
