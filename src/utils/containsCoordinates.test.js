const assert = require('assert');
const containsCoordinates = require('./containsCoordinates');

describe('utils:containsCoordinates', () => {
  describe('given coordinates are in the set', () => {
    it('returns true', () => {
      assert.equal(
        containsCoordinates([[5, 5], [4, 5], [3, 5]], [4, 5]),
        true
      );
    });
  });

  describe('given coordinates are not in the set', () => {
    it('returns false', () => {
      assert.equal(
        containsCoordinates([[5, 5], [4, 5], [3, 5]], [3, 4]),
        false
      );
    });
  });
});
