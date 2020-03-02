export default {
  name: '🗽Manhattan Distance',
  average: 11,
  points: 35,
  score: 1012,
  content: `/**
* Manhattan Distance
*
* Distance function or metric of Euclidean geometry
* is replaced by a new metric in which the distance
* between two points is the sum of the absolute
* differences of their Cartesian coordinates.
*
* Pros: It's the quickest direct route to the point
* Cons: It doesn't take any of the environment into account
*
* Summary: It's quick but short lived
*/

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
  return Math.abs(cell[0] - point[0]) + Math.abs(cell[1] - point[1]);
}`,
};
