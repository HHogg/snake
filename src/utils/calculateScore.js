module.exports = function calculateScore(norm, avg, value, multi) {
  return Math.abs(((( norm / value) - (norm / avg)) || 1)) * multi;
};
