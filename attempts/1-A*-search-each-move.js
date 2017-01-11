/**
 * @name findPath
 * @description Function that is called at the beginning of each point, expecting
 * an array of directions to be given to reach the X,Y coordinates of the square
 * with the point on. The game will pause if the snake crashes or if the point
 * is never reached.
 *
 * @param {Number} xMax Number of cells across the x axis.
 * @param {Number} yMax Number of cells across the y axis.
 * @param {Array} snake Array of [X,Y] cords of the snake from head to tail.
 * @param {Array} point [X, Y] coordinates of the point.
 * @param {Object} D Constant directions to be returned (UP, RIGHT, DOWN, LEFT)
 *
 * @return {Array} Moves for each cell i.e [D.UP, D.UP, D.RIGHT]
 */
function findPath(xMax, yMax, snake, point, DIR) {
  const moves = [];
  const [pX, pY] = point;
  const { UP: U, DOWN: D, LEFT: L, RIGHT: R } = DIR;
  
  function shift(x, y, d) {
    switch (d) {
      case U: return [x, y - 1];
      case R: return [x + 1, y];
      case D: return [x, y + 1];
      case L: return [x - 1, y];
    }
  }
  
  function heuristic([x, y]) {
    return Math.abs(x - pX) + Math.abs(y - pY);
  }
  
  function isValid([, [x, y]]) {
    return x >= 0 && x < xMax && y >= 0 && y < yMax &&
      !snake.some(([sX, sY]) => x === sX && y === sY);
  }
  
  function byHeuristic([,, aH], [,, bH]) {
    return aH - bH;
  }
  
  let [[x, y]] = snake;
  let index = 0;

  while (x !== pX || y !== pY) {
    const SU = shift(x, y, U);
    const SR = shift(x, y, R);
    const SD = shift(x, y, D);
    const SL = shift(x, y, L);
    const winner = [
      [U, SU, heuristic(SU)],
      [R, SR, heuristic(SR)],
      [D, SD, heuristic(SD)],
      [L, SL, heuristic(SL)],
    ].filter(isValid).sort(byHeuristic);
    
    if (!winner[0]) {
      return moves; 
    }
    
    const [d, p] = winner[0];
    
    moves.push(d);
    snake = [p].concat(snake).slice(0, -1);
    [[x, y]] = snake;
  }
  
  return moves;
}
