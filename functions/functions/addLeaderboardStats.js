/* eslint-disable no-console */

const { VM } = require('vm2');
const { FN_TIMEOUT_SECONDS, CLOUD_RUN_TIMES, CLOUD_CANVAS_SIZE } = require('../config');
const calculateAverage = require('../common/calculateAverage');
const calculateScore = require('../common/calculateScore');
const containsCoordinates = require('../common/containsCoordinates');
const { createEnvironment, createPoint } = require('../common/createEnvironment');
const getSurroundingCells = require('../common/getSurroundingCells');

const xMax = CLOUD_CANVAS_SIZE;
const yMax = CLOUD_CANVAS_SIZE;

const createGetValues = (vm, solution) => (snake, point) => {
  try {
    return vm.run(`

${solution};


if (typeof heuristic === 'undefined') {
  throw 'No function called "heuristic" was found.';
}

var xMax = ${xMax};
var yMax = ${yMax};
var snake = JSON.parse('${JSON.stringify(snake)}');
var point = JSON.parse('${JSON.stringify(point)}');

var values = [];

for (let y = 0; y < yMax; y++) {
  values[y] = [];
  for (let x = 0; x < xMax; x++) {
    values[y][x] = heuristic(x, y, xMax, yMax, snake, point);

    if (isNaN(parseInt(values[y][x]))) {
      throw 'NaN was given';
    }
  }
}

values;

    `);
  } catch (e) {
    return null;
  }
};

const runSolution = (getValues, env) => {
  let {
    snake,
    point,
    history,
    average,
    points,
    score,
  } = (env || Object.assign({}, createEnvironment(xMax, yMax), {
    history: [[]],
    average: 0,
    points: 0,
    score: 0,
  }));

  const values = getValues(snake, point);

  if (!Array.isArray(values)) {
    return { average, points, score };
  }

  const cells = getSurroundingCells(snake, xMax, yMax);
  const nextCell = cells.sort(([ax, ay], [bx, by]) => values[ay][ax] - values[by][bx])[0];

  if (!nextCell) {
    return { average, points, score };
  }

  history = [[nextCell, ...history[0]], ...history.slice(1)];

  if (containsCoordinates([nextCell], point)) {
    snake = [nextCell, ...snake];
    average = calculateAverage(history);
    score = score + calculateScore(xMax * yMax, average, history[0].length, points);
    points = points + 1;
    point = createPoint(xMax, yMax, snake);
    history = [[], ...history];
  } else {
    snake = [nextCell, ...snake.slice(0, -1)];
  }

  return runSolution(getValues, {
    snake,
    point,
    history,
    average,
    points,
    score,
  });
};

const getStats = (solution) => {
  const runs = [];
  const vm = new VM({
    timeout: FN_TIMEOUT_SECONDS * 1000,
    sandbox: {},
  });

  const getValues = createGetValues(vm, solution);

  for (let i = 0; i < CLOUD_RUN_TIMES; i++) {
    runs.push(runSolution(getValues));
  }

  return runs.sort((a, b) => b.score - a.score)[0];
};


module.exports = {
  createGetValues,
  getStats,
  runSolution,
};
