const assert = require('assert');
const calculateAverage = require('./calculateAverage');

describe('utils:calculateAverage', () => {
  describe('with an empty dataset', () => {
    it('return 0', () => {
      assert.equal(calculateAverage([]), 0);
    });
  });

  describe('with a single entry in the dataset', () => {
    it('returns that entry', () => {
      assert.equal(calculateAverage([5]), 5);
    });
  });

  describe('with an even number of entries in the dataset', () => {
    it('returns the mean of the 2 middle values', () => {
      assert.equal(calculateAverage([10, 3, 5, 7]), 6);
    });
  });

  describe('with an odd number of entries in the dataset', () => {
    it('returns the middle value', () => {
      assert.equal(calculateAverage([3, 10, 7, 5, 2]), 5);
    });
  });
});
