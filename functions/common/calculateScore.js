module.exports = (boardSize, averageMoves, points) =>
  Math.max(1, points * (
    Math.pow(
      Math.max(0, Math.min(1, 1 - (averageMoves / boardSize))),
      Math.log(points || 1)
    )
  ));
