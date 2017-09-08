/* eslint-disable no-console */

const { VM, VMScript } = require('vm2');
const { FN_TIMEOUT_SECONDS, CLOUD_RUN_TIMES, CLOUD_CANVAS_SIZE } = require('../config');
const { createBlock, moveForwards } = require('../common/history');
const { createEnvironment, createPoint } = require('../common/createEnvironment');
const getSurroundingCells = require('../common/getSurroundingCells');
const containsCoordinates = require('../common/containsCoordinates');
const xMax = CLOUD_CANVAS_SIZE;
const yMax = CLOUD_CANVAS_SIZE;

const createGetValue = (vm, solution) => (cell, snake, point) => {
  return vm.run(`

${solution};

if (typeof heuristic === 'undefined') {
  throw new Error('No function called "heuristic" was found.');
}

heuristic(
  JSON.parse('${JSON.stringify(cell)}'),
  ${xMax},
  ${yMax},
  JSON.parse('${JSON.stringify(snake)}'),
  JSON.parse('${JSON.stringify(point)}')
);
  `);
};

const runSolution = (getValue, history) => {
  if (!history) {
    const { snake, point } = createEnvironment(xMax, yMax);
    history = createBlock([], 0, snake, point);
  }

  const points = history.length - 1;
  const point = history[points][0];
  const snake = history[points][1];
  const nextMove = getSurroundingCells(snake, xMax, yMax).map((cell) => {
    const value = getValue(cell, snake, point);

    if (isNaN(parseInt(value))) {
      throw new Error('The heuristic function did not return a number.');
    }

    return { cell, value };
  }).sort((a, b) => a.value - b.value)[0];

  if (!nextMove) {
    return history.slice(0, -1);
  }

  const { cell } = nextMove;

  if (containsCoordinates([cell], point)) {
    const nextSnake = [cell, ...snake];
    const hasFinished = nextSnake.length === (xMax * yMax);
    const nextPoint = !hasFinished
      ? createPoint(xMax, yMax, nextSnake)
      : null;
    history = createBlock(history, points + 1, nextSnake, nextPoint);

    if (hasFinished) {
      return history;
    }
  } else {
    const nextSnake = [cell, ...snake.slice(0, -1)];
    history = moveForwards(history, points, nextSnake, snake[snake.length - 1]);
  }

  return runSolution(getValue, history);
};

const getStats = (solution) => {
  const runs = [];
  const vm = new VM({
    timeout: FN_TIMEOUT_SECONDS * 1000,
    sandbox: {},
    wrapper: 'none',
    console: 'off',
  });

  try {
    solution = new VMScript(solution).compile().code;
  } catch (e) {
    throw new Error('Failed to compile solution.');
  }

  const getValue = createGetValue(vm, solution);

  for (let i = 0; i < CLOUD_RUN_TIMES; i++) {
    runs.push(
      runSolution(getValue).map(([,, tails]) => tails.length)
    );
  }

  return runs.sort((a, b) => b.length - a.length)[0];
};


module.exports = {
  createGetValue,
  getStats,
  runSolution,
};
