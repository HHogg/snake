/* eslint-disable no-console */

const { VM } = require('vm2');
const { FN_TIMEOUT_SECONDS } = require('../config');
const calculateAverage = require('../common/calculateAverage');
const calculateScore = require('../common/calculateScore');
const containsCoordinates = require('../common/containsCoordinates');
const { createEnvironment, createPoint } = require('../common/createEnvironment');
const getSurroundingCells = require('../common/getSurroundingCells');

const xMax = 15;
const yMax = 15;
const averageCount = 5;

const createGetValues = (solution) => (snake, point) => {
  try {
    return new VM({
      timeout: FN_TIMEOUT_SECONDS * 1000,
      sandbox: {},
    }).run(`

var heuristicFn = (function() {
  ${solution};
  return heuristic;
})();

var xMax = ${xMax};
var yMax = ${yMax};
var snake = JSON.parse('${JSON.stringify(snake)}');
var point = JSON.parse('${JSON.stringify(point)}');

var values = [];

for (let y = 0; y < yMax; y++) {
  values[y] = [];
  for (let x = 0; x < xMax; x++) {
    values[y][x] = heuristicFn(x, y, xMax, yMax, snake, point);

    if (isNaN(parseInt(values[y][x]))) {
      throw new Error();
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
    /* eslint-disable prefer-const */
    history,
    /* eslint-enable prefer-const */
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

  if (containsCoordinates(cells, point)) {
    snake = [point, ...snake];
    point = createPoint(xMax, yMax, snake);
    history[0].unshift(point);
    points++;
    average = calculateAverage(history);
    score += calculateScore(xMax * yMax, average, history[0].length, points);
    history.unshift([]);
  } else {
    snake = [nextCell, ...snake.slice(0, -1)];
    history[0].unshift(nextCell);
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
  const getValues = createGetValues(solution);

  for (let i = 0; i < averageCount; i++) {
    runs.push(runSolution(getValues));
  }

  return runs.sort((a, b) => b.score - a.score)[0];
};


module.exports = {
  createGetValues,
  getStats,
  runSolution,
  xMax,
  yMax,
};
