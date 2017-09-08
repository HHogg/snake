const AVERAGE_WEIGHT = 20;

module.exports = (boardSize, averageMoves, points) =>
  points * (
    Math.pow(1 - (averageMoves / boardSize), AVERAGE_WEIGHT)
  );
