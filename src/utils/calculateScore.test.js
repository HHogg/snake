import calculateScore from './calculateScore';

describe('utils:calculateScore', () => {
  it('normalises the score', () => {
    expect(calculateScore(100, 10, 12, 2))
      .toBe(calculateScore(400, 40, 48, 2));

    expect(calculateScore(200, 20, 24, 2))
      .toBe(calculateScore(300, 30, 36, 2));
  });

  it('has a greater score for a lower average', () => {
    expect(calculateScore(100, 5, 10, 2))
      .toBeGreaterThan(calculateScore(100, 10, 10, 2));
  });

  it('has a greater score if the last value is lower than the average', () => {
    expect(calculateScore(100, 10, 5, 2))
      .toBeGreaterThan(calculateScore(100, 10, 10, 2));
  });

  it('has a greater score the higher the multiplier', () => {
    expect(calculateScore(100, 10, 10, 10))
      .toBeGreaterThan(calculateScore(100, 10, 10, 2));
  });
});
