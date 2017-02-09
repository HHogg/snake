module.exports = function containsCoordinates(set, [x, y]) {
  return set.some(([sx, sy]) => x === sx && y === sy);
};
