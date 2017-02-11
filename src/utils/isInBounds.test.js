const assert = require('assert');
const isInBounds = require('./isInBounds');

describe('utils:isInBounds', () => {
  describe('when the x value is less than 0', () => {
    it('returns false', () => {
      assert.equal(isInBounds(10, 10, [-1, 5]), false);
    });
  });

  describe('when the x value is greater than the upper x bound', () => {
    it('returns false', () => {
      assert.equal(isInBounds(10, 10, [10, 5]), false);
    });
  });

  describe('when the y value is less than 0', () => {
    it('returns false', () => {
      assert.equal(isInBounds(10, 10, [5, -1]), false);
    });
  });

  describe('when the y value is greater than the upper y bound', () => {
    it('returns false', () => {
      assert.equal(isInBounds(10, 10, [5, 10]), false);
    });
  });

  describe('when the x and y values are within the bounds', () => {
    it('returns true', () => {
      assert.equal(isInBounds(10, 10, [5, 5]), true);
    });
  });
});
