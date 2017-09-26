module.exports = (dataset) => dataset.length &&
  dataset.reduce((acc, { length }) => acc + length, 0) / dataset.length;
