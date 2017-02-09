module.exports = function calculateScore(normaliser, average, seq, multiplier) {
  return ((normaliser / average) / (normaliser / seq)) * multiplier;
};
