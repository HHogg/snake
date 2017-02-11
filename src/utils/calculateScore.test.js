const assert = require('assert');
const calculateScore = require('./calculateScore');

describe('utils:calculateScore', () => {
  it('normalises the score', () => {
    assert.equal(
      calculateScore(100, 10, 12, 2),
      calculateScore(400, 40, 48, 2)
    );

    assert.equal(
      calculateScore(200, 20, 24, 2),
      calculateScore(300, 30, 36, 2)
    );
  });

  it('has a greater score for a lower average', () => {
    assert(
      calculateScore(100, 5, 10, 2) >
      calculateScore(100, 10, 10, 2)
    );
  });

  it('has a greater score if the last value is lower than the average', () => {
    assert(
      calculateScore(100, 10, 5, 2) >
      calculateScore(100, 10, 10, 2)
    );
  });

  it('has a greater score the higher the multiplier', () => {
    assert(
      calculateScore(100, 10, 10, 10) >
      calculateScore(100, 10, 10, 2)
    );
  });
});
