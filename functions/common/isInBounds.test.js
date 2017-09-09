import isInBounds from './isInBounds';

describe('common: isInBounds', () => {
  describe('when the x value is less than 0', () => {
    test('returns false', () => {
      expect(isInBounds(10, 10, [-1, 5])).toBe(false);
    });
  });

  describe('when the x value is greater than the upper x bound', () => {
    test('returns false', () => {
      expect(isInBounds(10, 10, [10, 5])).toBe(false);
    });
  });

  describe('when the y value is less than 0', () => {
    test('returns false', () => {
      expect(isInBounds(10, 10, [5, -1])).toBe(false);
    });
  });

  describe('when the y value is greater than the upper y bound', () => {
    test('returns false', () => {
      expect(isInBounds(10, 10, [5, 10])).toBe(false);
    });
  });

  describe('when the x and y values are within the bounds', () => {
    test('returns true', () => {
      expect(isInBounds(10, 10, [5, 5])).toBe(true);
    });
  });
});
