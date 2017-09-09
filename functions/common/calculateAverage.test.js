import calculateAverage from './calculateAverage';

describe('common: calculateAverage', () => {
  describe('with an empty dataset', () => {
    test('return 0', () => {
      expect(calculateAverage([])).toBe(0);
    });
  });

  test('returns the mean', () => {
    expect(calculateAverage([
      new Array(5),
      new Array(5),
      new Array(10),
      new Array(20),
      new Array(40),
      new Array(60),
      new Array(80),
      new Array(100),
    ])).toBe(40);
  });
});
