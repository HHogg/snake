import { VM } from 'vm2';
import { FN_TIMEOUT_SECONDS } from '../config';
import { createGetValue, getStats, runSolution } from './addLeaderboardStats';

const mockCell = [4, 4];
const mockSnake = [[8, 4], [7, 4], [6, 4], [5, 4]];
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

  describe('createGetValue:', () => {
    it('creates a callable function', () => {
      expect(typeof createGetValue(vm, validSolution)).toBe('function');
    });

    it('returns the value from the heuristic function', () => {
      expect(isNaN(createGetValue(vm, validSolution)(mockCell, mockSnake, mockPoint))).toBe(false);
    });

    it('handles invalid solution', () => {
      expect(() => createGetValue(vm, invalidSolution)(mockCell, mockSnake, mockPoint))
        .toThrow('No function called "heuristic" was found.');
    });

    it('handles empty solution', () => {
      expect(() => createGetValue(vm, emptySolution)(mockCell, mockSnake, mockPoint))
        .toThrow('No function called "heuristic" was found.');
    });
  });

  describe('runSolution:', () => {
    it('handles valid solution', () => {
      expect(runSolution(createGetValue(vm, validSolution)).length).toBeGreaterThan(0);
    });

    it('handles non-integer solution', () => {
      expect(() => runSolution(createGetValue(vm, nonIntegerSolution)))
        .toThrow('The heuristic function did not return a number.');
    });

    it('handles invalid solution', () => {
      expect(() => runSolution(createGetValue(vm, invalidSolution)))
        .toThrow('No function called "heuristic" was found.');
    });

    it('handles empty solution', () => {
      expect(() => runSolution(createGetValue(vm, emptySolution)))
        .toThrow('No function called "heuristic" was found.');
    });
  });

  describe('getStats:', () => {
    it('handles valid solution', () => {
      expect(getStats(validSolution).length).toBeGreaterThan(0);
    });

    it('handles non-integer solution', () => {
      expect(() => getStats(nonIntegerSolution))
        .toThrow('The heuristic function did not return a number.');
    });

    it('handles invalid solution', () => {
      expect(() => getStats(invalidSolution))
        .toThrow('No function called "heuristic" was found.');
    });

    it('handles empty solution', () => {
      expect(() => getStats(emptySolution))
        .toThrow('No function called "heuristic" was found.');
    });
  });
});
