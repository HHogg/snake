/**
 * A* search with Manhattan heuristic (http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html)
 * It seems to calculate the shortest path ok but:
 * 1) Doesn't account for a future crash on that point
 * 2) Doesn't account for the environment after it has collected that point.
 *
 * MAX POINTS: 70 something (But it's mainly luck)
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

  function shift([x, y], direction) {
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
    const directions = [
      [D.UP, shift(snake[0], D.UP), heuristic(shift(snake[0], D.UP))],
      [D.RIGHT, shift(snake[0], D.RIGHT), heuristic(shift(snake[0], D.RIGHT))],
      [D.DOWN, shift(snake[0], D.DOWN), heuristic(shift(snake[0], D.DOWN))],
      [D.LEFT, shift(snake[0], D.LEFT), heuristic(shift(snake[0], D.LEFT))],
    ].filter(filterInvalid).sort(sortByHeuristic);

    if (directions.length === 0) {
      // Shit no moves... return so we can see where it ends up.
      return moves;
    }

    moves.push(directions[0][0]);
    snake = [shift(snake[0], directions[0][0])].concat(snake).slice(0, -1);
    [nX, nY] = directions[0][1];
  }

  return moves;
}
