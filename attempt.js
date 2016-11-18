/**
 * @description Function to return the moves to locate the next point.
 *
 * @param {Number} xMax Number of cells across the x axis.
 * @param {Number} yMax Number of cells across the y axis.
 * @param {Array} snake Array of [X,Y] cords of the snake from head to tail.
 * @param {Array} point [X, Y] coordinates of the point.
 * @param {Object} D Constant directions to be returned (UP, RIGHT, DOWN, LEFT)
 *
 * @return {Array} Moves for each cell i.e [D.UP, D.UP, D.RIGHT]
 */
 function findPath(xMax, yMax, snake, point, D) {
  function heuristic([x, y]) {
    return Math.abs(x - pX) + Math.abs(y - pY);
  }

  function isInBounds([ x, y ]) {
    return x >= 0 && x < xMax && y >= 0 && y < yMax;
  }

  function hasNotColided([ x, y ], snake) {
    return !snake.find(([ sX, sY ]) => x === sX && y === sY);
  }

  function filterInvalid([d, p]) {
    return isInBounds(p) && hasNotColided(p, snake);
  }

  function sortByHeuristic([aD, aP, aH], [bD, bP, bH]) {
    return aH - bH;
  }

  function getNextPosition(snake, direction) {
    return [shiftPosition(snake[0], direction)].concat(snake);
  }

  function shiftPosition([x, y], direction) {
    switch (direction) {
      case D.UP:    return [x, y - 1];
      case D.RIGHT: return [x + 1, y];
      case D.DOWN:  return [x, y + 1];
      case D.LEFT:  return [x - 1, y];
    }
  }

  const [pX, pY] = point;
  const moves = [];
  let nX, nY;

  while (nX !== pX || nY !== pY) {
    const [cX, cY] = snake[0];
    const posUp = [cX, cY - 1];
    const posRight = [cX + 1, cY];
    const posDown = [cX, cY + 1];
    const posLeft = [cX - 1, cY];
    const directions = [
      [D.UP, posUp, heuristic(posUp)],
      [D.RIGHT, posRight, heuristic(posRight)],
      [D.DOWN, posDown, heuristic(posDown)],
      [D.LEFT, posLeft, heuristic(posLeft)],
    ].filter(filterInvalid).sort(sortByHeuristic);

    if (directions.length === 0) {
      // Shit no moves... return so we can see where it ends up.
      return moves;
    }

    moves.push(directions[0][0]);
    snake = getNextPosition(snake, directions[0][0]).slice(0, -1);
    [nX, nY] = directions[0][1];
  }

  return moves;
}
