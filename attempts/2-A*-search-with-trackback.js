/**
 * This gets further than A*-search-each-move as when it detects an invalid path
 * it traces back to a time where it has a valid path. However when it exhausts
 * all efforts to find a valid path, it crashes.
 *
 * I'm abandoning this technique.
 *
 * * MAX POINTS: 116 (A little less reliant on luck)
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
    return isInBounds(p) &&
      hasNotColided(p, snake) &&
      !invalidPaths.find((p) => p == moves.concat([d]).join('.'));
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
  const invalidPaths = [];
  let nX, nY;

  while (nX !== pX || nY !== pY) {
    const directions = [
      [D.UP, shift(snake[0], D.UP), heuristic(shift(snake[0], D.UP))],
      [D.RIGHT, shift(snake[0], D.RIGHT), heuristic(shift(snake[0], D.RIGHT))],
      [D.DOWN, shift(snake[0], D.DOWN), heuristic(shift(snake[0], D.DOWN))],
      [D.LEFT, shift(snake[0], D.LEFT), heuristic(shift(snake[0], D.LEFT))],
    ].filter(filterInvalid).sort(sortByHeuristic);

    if (directions.length === 0) {
      invalidPaths.push(moves.map(([d]) => d).join('.'));
      snake = moves.shift()[1];
    } else {
      moves.push([directions[0][0], snake]);
      snake = [shift(snake[0], directions[0][0])].concat(snake).slice(0, -1);
      [nX, nY] = directions[0][1];
    }
  }

  return moves.map(([d]) => d);
}
