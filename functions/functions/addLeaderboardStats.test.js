import sinon from 'sinon';
import { VM } from 'vm2';
import { FN_TIMEOUT_SECONDS } from '../config';
import { createGetValue, getStats, runSolution } from './addLeaderboardStats';

jest.useFakeTimers();

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

describe('addLeaderboardStats:', () => {
  let vm;
  let sandbox;
  let resolveStub;
  let rejectStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    resolveStub = sandbox.stub();
    rejectStub = sandbox.stub();
    vm = new VM({
      timeout: FN_TIMEOUT_SECONDS * 1000,
      sandbox: {},
      wrapper: 'none',
      console: 'off',
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('createGetValue:', () => {
    test('creates a callable function', () => {
      expect(typeof createGetValue(vm, validSolution)).toBe('function');
    });

    test('returns the value from the heuristic function', () => {
      expect(isNaN(createGetValue(vm, validSolution)(mockCell, mockSnake, mockPoint))).toBe(false);
    });

    test('handles invalid solution', () => {
      expect(() => createGetValue(vm, invalidSolution)(mockCell, mockSnake, mockPoint))
        .toThrow('No function called "heuristic" was found.');
    });

    test('handles empty solution', () => {
      expect(() => createGetValue(vm, emptySolution)(mockCell, mockSnake, mockPoint))
        .toThrow('No function called "heuristic" was found.');
    });
  });

  describe('runSolution:', () => {
    test('handles valid solution', () => {
      runSolution(createGetValue(vm, validSolution), resolveStub, rejectStub);
      jest.runAllTimers();
      expect(resolveStub.calledOnce).toBe(true);
      expect(resolveStub.firstCall.args[0].length).toBeGreaterThan(0);
    });

    test('handles non-integer solution', () => {
      runSolution(createGetValue(vm, nonIntegerSolution), resolveStub, rejectStub);
      jest.runAllTimers();
      expect(rejectStub.calledOnce).toBe(true);
      expect(rejectStub.firstCall.args[0])
        .toBe('The heuristic function did not return a number.');
    });

    test('handles invalid solution', () => {
      runSolution(createGetValue(vm, invalidSolution), resolveStub, rejectStub);
      jest.runAllTimers();
      expect(rejectStub.calledOnce).toBe(true);
      expect(rejectStub.firstCall.args[0])
        .toBe('No function called "heuristic" was found.');
    });

    test('handles empty solution', () => {
      runSolution(createGetValue(vm, emptySolution), resolveStub, rejectStub);
      jest.runAllTimers();
      expect(rejectStub.calledOnce).toBe(true);
      expect(rejectStub.firstCall.args[0])
        .toBe('No function called "heuristic" was found.');
    });
  });

  describe('getStats:', () => {
    test('handles valid solution', () => {
      const promise = getStats(validSolution);
      jest.runAllTimers();
      return promise.then((history) => {
        expect(history.length).toBeGreaterThan(0);
      });
    });

    test('handles non-integer solution', () => {
      const promise = getStats(nonIntegerSolution);
      jest.runAllTimers();
      return promise.catch((error) => {
        expect(error).toBe('The heuristic function did not return a number.');
      });
    });

    test('handles invalid solution', () => {
      const promise = getStats(invalidSolution);
      jest.runAllTimers();
      return promise.catch((error) => {
        expect(error).toBe('No function called "heuristic" was found.');
      });
    });

    test('handles empty solution', () => {
      const promise = getStats(emptySolution);
      jest.runAllTimers();
      return promise.catch((error) => {
        expect(error).toBe('No function called "heuristic" was found.');
      });
    });
  });
});
