const assert = require('assert');
const incrementLastElement = require('./incrementLastElement');

describe('utils:incrementLastElement', () => {
  it('returns a new array with incremented last element', () => {
    const test = [0, 0];

    assert.deepEqual(incrementLastElement(test), [0, 1]);
    assert.notEqual(incrementLastElement(test), test);
  });
});
