import containsCoordinates from './containsCoordinates';

describe('common: containsCoordinates', () => {
  describe('given coordinates are in the set', () => {
    test('returns true', () => {
      expect(containsCoordinates([[5, 5], [4, 5], [3, 5]], [4, 5]))
        .toBe(true);
    });
  });

  describe('given coordinates are not in the set', () => {
    test('returns false', () => {
      expect(containsCoordinates([[5, 5], [4, 5], [3, 5]], [3, 4]))
        .toBe(false);
    });
  });
});
