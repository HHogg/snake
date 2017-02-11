module.exports = function calculateAverage(dataset) {
  const sortedDataSet = dataset.slice(0).sort((a, b) => a - b);

  if (sortedDataSet.length === 0) {
    return 0;
  }

  if (sortedDataSet.length === 1) {
    return sortedDataSet[0];
  }

  if ((sortedDataSet.length / 2) % 1) {
    return sortedDataSet[Math.floor(sortedDataSet.length / 2)];
  }

  return (
    sortedDataSet[(sortedDataSet.length / 2) - 1] +
    sortedDataSet[sortedDataSet.length / 2]
  ) / 2;
};
