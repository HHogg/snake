import { VM } from 'vm2';
import { CLOUD_CANVAS_SIZE, FN_TIMEOUT_SECONDS } from '../config';
import {
  createGetValues,
  getStats,
  runSolution,
} from './addLeaderboardStats';

const mockSnake = [[0, 0], [1, 0], [2, 0], [3, 0]];
const mockPoint = [5, 5];

const validSolution = `
  function randomFn() {}
  function heuristic(cell, xMax, yMax, snake, point) {
    return Math.abs(cell[0] - point[0]) + Math.abs(cell[1] - point[1]);
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
let vm;

describe('addLeaderboardStats:', () => {
  beforeEach(() => {
    vm = new VM({
      timeout: FN_TIMEOUT_SECONDS * 1000,
      sandbox: {},
    });
  });

  describe('createGetValues:', () => {
    it('creates a callable function', () => {
      expect(typeof createGetValues(vm, validSolution)).toBe('function');
    });

    it('returns correct number of rows and columns', () => {
      const values = createGetValues(vm, validSolution)(mockSnake, mockPoint);

      expect(values.length).toBe(CLOUD_CANVAS_SIZE);
      values.forEach((columns) => {
        expect(columns.length).toBe(CLOUD_CANVAS_SIZE);
      });
    });

    it('returns the value from the heuristic function', () => {
      createGetValues(vm, validSolution)(mockSnake, mockPoint).forEach((columns) => {
        columns.forEach((value) => {
          expect(isNaN(value)).toBe(false);
        });
      });
    });

    it('handles non-integer solution', () => {
      expect(createGetValues(vm, nonIntegerSolution)(mockSnake, mockPoint)).toBe(null);
    });

    it('handles invalid solution', () => {
      expect(createGetValues(vm, invalidSolution)(mockSnake, mockPoint)).toBe(null);
    });

    it('handles empty solution', () => {
      expect(createGetValues(vm, emptySolution)(mockSnake, mockPoint)).toBe(null);
    });
  });

  describe('runSolution:', () => {
    it('handles valid solution', () => {
      const { average, points, score } = runSolution(createGetValues(vm, validSolution));

      expect(average).toBeGreaterThan(0);
      expect(points).toBeGreaterThan(0);
      expect(score).toBeGreaterThan(0);
    });

    it('handles non-integer solution', () => {
      const { average, points, score } = runSolution(createGetValues(vm, nonIntegerSolution));

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });

    it('handles invalid solution', () => {
      const { average, points, score } = runSolution(createGetValues(vm, invalidSolution));

      expect(average).toBe(0);
      expect(points).toBe(0);
      expect(score).toBe(0);
    });

    it('handles empty solution', () => {
      const { average, points, score } = runSolution(createGetValues(vm, emptySolution));

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
