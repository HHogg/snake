module.exports = (boardSize, averageMoves, points) =>
  Math.max(1, points * (
    Math.pow(1 - (averageMoves / boardSize), Math.log(points || 1))
  ));
