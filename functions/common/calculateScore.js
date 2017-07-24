
module.exports = (norm, avg, value, multi) =>
  Math.abs(
    (((norm / value) - (norm / avg)) || 1)
  ) * multi;
