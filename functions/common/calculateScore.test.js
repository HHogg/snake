import calculateScore from './calculateScore';

describe('common: calculateScore', () => {
  it('normalises the score', () => {
    expect(calculateScore(100, 10, 2))
      .toBe(calculateScore(400, 40, 2));

    expect(calculateScore(200, 20, 2))
      .toBe(calculateScore(300, 30, 2));
  });

  it('has a greater score for a lower average', () => {
    expect(calculateScore(100, 5, 2))
      .toBeGreaterThan(calculateScore(100, 10, 2));
  });

  it('has a greater score the higher the points', () => {
    expect(calculateScore(100, 10, 10))
      .toBeGreaterThan(calculateScore(100, 10, 2));
  });
});
