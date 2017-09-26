/* eslint-disable no-console */

const { VM, VMScript } = require('vm2');
const { FN_TIMEOUT_SECONDS, CLOUD_CANVAS_SIZE, CLOUD_TIMEOUT_SECONDS } = require('../config');
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
  throw 'No function called "heuristic" was found.';
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


const runSolution = (getValue, resolve, reject, history) => {
  if (!history) {
    const { snake, point } = createEnvironment(xMax, yMax);
    history = createBlock([], 0, snake, point);
  }

  const points = history.length - 1;
  const point = history[points][0];
  const snake = history[points][1];
  const cells = getSurroundingCells(snake, xMax, yMax);
  let nextValue;
  let nextCell;

  for (let i = 0; i < cells.length; i++) {
    let value;

    try {
      value = getValue(cells[i], snake, point);
    } catch (error) {
      return reject(error.toString());
    }

    if (isNaN(parseInt(value))) {
      return reject('The heuristic function did not return a number.');
    }

    if (nextValue === undefined || value < nextValue) {
      nextValue = value;
      nextCell = cells[i];
    }
  }

  if (!nextCell) {
    return resolve(history.slice(0, -1));
  }

  if (containsCoordinates([nextCell], point)) {
    const nextSnake = [nextCell, ...snake];
    const hasFinished = nextSnake.length === (xMax * yMax);

    history = createBlock(
      history,
      points + 1,
      nextSnake,
      hasFinished ? null : createPoint(xMax, yMax, nextSnake)
    );

    if (hasFinished) {
      return resolve(history);
    }
  } else {
    history = moveForwards(
      history,
      points,
      [nextCell, ...snake.slice(0, -1)],
      snake[snake.length - 1]
    );
  }

  setTimeout(() => {
    runSolution(getValue, resolve, reject, history);
  }, 0);
};

const getStats = (solution) => {
  const vm = new VM({
    timeout: (FN_TIMEOUT_SECONDS * 1000) / 3,
    sandbox: {},
    wrapper: 'none',
    console: 'off',
  });

  return new Promise((resolve, reject) => {
    try {
      solution = new VMScript(solution).compile().code;
    } catch (e) {
      return reject(new Error('Failed to compile solution.'));
    }

    const solutionTimeout = setTimeout(() => {
      reject(new Error('Solution took too long to run'));
    }, CLOUD_TIMEOUT_SECONDS * 1000);

    runSolution(createGetValue(vm, solution), (history) => {
      clearTimeout(solutionTimeout);
      resolve(history);
    }, reject);
  });
};


module.exports = {
  createGetValue,
  getStats,
  runSolution,
};
