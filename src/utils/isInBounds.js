module.exports = function isInBounds(xMax, yMax, [x, y]) {
  return x >= 0 && x < xMax && y >= 0 && y < yMax;
};
