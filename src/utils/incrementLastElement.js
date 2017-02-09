module.exports = function incrementLastElement(array) {
  return array.slice(0, -1).concat([array[array.length - 1] + 1]);
};
