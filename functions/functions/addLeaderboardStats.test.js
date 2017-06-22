import {
  createGetValues,
  getStats,
  runSolution,
  xMax,
  yMax,
} from './addLeaderboardStats';

const mockSnake = [[0, 0], [1, 0], [2, 0], [3, 0]];
const mockPoint = [5, 5];

const validSolution = `
  function randomFn() {}
  function heuristic(x, y, xMax, yMax, snake, point) {
    return Math.abs(x - point[0]) + Math.abs(y - point[1]);
  }
`;

const nonIntegerSolution = `
  function heuristic() {
    return null;
  }
`;

const invalidSolution = `
  function notCalledHeuristic() {
    return 0;
  }
`;

const emptySolution = '';

describe('addLeaderboardStats:', () => {
  describe('createGetValues:', () => {
    it('creates a callable function', () => {
      expect(typeof createGetValues(validSolution)).toBe('function');
    });

    it('returns correct number of rows and columns', () => {
      const values = createGetValues(validSolution)(mockSnake, mockPoint);

      expect(values.length).toBe(yMax);
      values.forEach((columns) => {
        expect(columns.length).toBe(xMax);
      });
    });

    it('returns the value from the heuristic function', () => {
      createGetValues(validSolution)(mockSnake, mockPoint).forEach((columns) => {
        columns.forEach((value) => {
          expect(isNaN(value)).toBe(false);
        });
      });
    });

    it('handles non-integer solution', () => {
      expect(createGetValues(nonIntegerSolution)(mockSnake, mockPoint)).toBe(null);
    });

    it('handles invalid solution', () => {
      expect(createGetValues(invalidSolution)(mockSnake, mockPoint)).toBe(null);
    });

    it('handles empty solution', () => {
      expect(createGetValues(emptySolution)(mockSnake, mockPoint)).toBe(null);
    });
  });

  describe('runSolution:', () => {
    it('handles valid solution', () => {
      const { average, points, score } = runSolution(createGetValues(validSolution));

      expect(average).toBeGreaterThan(0);
      expect(points).toBeGreaterThan(0);
      expect(score).toBeGreaterThan(0);
    });

    it('handles non-integer solution', () => {
      const { average, points, score } = runSolution(createGetValues(nonIntegerSolution));

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });

    it('handles invalid solution', () => {
      const { average, points, score } = runSolution(createGetValues(invalidSolution));

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });

    it('handles empty solution', () => {
      const { average, points, score } = runSolution(createGetValues(emptySolution));

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });
  });

  describe('getStats:', () => {
    it('handles valid solution', () => {
      const { average, points, score } = getStats(validSolution);

      expect(average).toBeGreaterThan(0);
      expect(points).toBeGreaterThan(0);
      expect(score).toBeGreaterThan(0);
    });

    it('handles non-integer solution', () => {
      const { average, points, score } = getStats(nonIntegerSolution);

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });

    it('handles invalid solution', () => {
      const { average, points, score } = getStats(invalidSolution);

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });

    it('handles empty solution', () => {
      const { average, points, score } = getStats(emptySolution);

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });
  });
});
