
export default (dataset) => {
  const sortedDataSet = dataset
    .slice(0)
    .sort((a, b) => a.length - b.length);

  if (sortedDataSet.length === 0) {
    return 0;
  }

  if (sortedDataSet.length === 1) {
    return sortedDataSet[0].length;
  }

  if ((sortedDataSet.length / 2) % 1) {
    return sortedDataSet[Math.floor(sortedDataSet.length / 2)].length;
  }

  return (
    sortedDataSet[(sortedDataSet.length / 2) - 1].length +
    sortedDataSet[sortedDataSet.length / 2].length
  ) / 2;
};
