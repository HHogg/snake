import calculateAverage from './calculateAverage';

describe('common: calculateAverage', () => {
  describe('with an empty dataset', () => {
    it('return 0', () => {
      expect(calculateAverage([])).toBe(0);
    });
  });

  describe('with a single entry in the dataset', () => {
    it('returns that entry', () => {
      expect(calculateAverage([
        new Array(5),
      ])).toBe(5);
    });
  });

  describe('with an even number of entries in the dataset', () => {
    it('returns the mean of the 2 middle values', () => {
      expect(calculateAverage([
        new Array(10),
        new Array(3),
        new Array(5),
        new Array(7),
      ])).toBe(6);
    });
  });

  describe('with an odd number of entries in the dataset', () => {
    it('returns the middle value', () => {
      expect(calculateAverage([
        new Array(3),
        new Array(10),
        new Array(7),
        new Array(5),
        new Array(2),
      ])).toBe(5);
    });
  });
});
