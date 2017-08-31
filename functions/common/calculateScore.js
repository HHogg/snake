
module.exports = (norm, avg, value, multi) =>
  Math.abs(
    (((norm / (value || 1)) - (norm / (avg || 1))) || 1)
  ) * multi;
