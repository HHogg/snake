const { CHAR_SNAKE_HEAD, CHAR_SNAKE_TAIL, CHAR_POINT, SNAKE_LENGTH } = require('../config');
const containsCoordinates = require('../utils/containsCoordinates');
const incrementLastElement = require('../utils/incrementLastElement');
const isInBounds = require('../utils/isInBounds');
const Sandbox = require('./Sandbox');

class Game {
  constructor(canvas, editor, consle, scoreboard) {
    this.canvas = canvas;
    this.editor = editor;
    this.console = consle;
    this.scoreboard = scoreboard;

    this.boundHandleMessage = this.handleMessage.bind(this);
    this.boundHandleError = this.handleError.bind(this);
    this.boundRun = this.run.bind(this);

    this.sandbox = new Sandbox(
      this.boundHandleMessage,
      this.boundHandleError
    );

    this.reset();
  }

  reset() {
    this.pause();
    this.history = [0];
    this.animationFrame = null;
    this.snake = this.createSnake();
    this.point = this.createPoint();
    this.console.clear();
    this.scoreboard.reset();
    this.sandbox.reset();
    this.redraw();
  }

  start() {
    this.refresh();
  }

  play() {
    this.isRunning = true;
    this.isPlaying = true;
    this.run();
  }

  pause() {
    this.isRunning = false;
    this.isPlaying = false;
    window.cancelAnimationFrame(this.animationFrame);
  }

  step() {
    this.isRunning = true;
    this.run();
  }

  refresh() {
    this.isRunning = false;
    this.run();
  }

  createSnake() {
    return new Array(SNAKE_LENGTH).fill().map((v, i) => [
      Math.floor(this.canvas.xMax / 2) - i,
      Math.floor(this.canvas.yMax / 2),
    ]);
  }

  createPoint() {
    const coordinates = [
      Math.floor(Math.random() * this.canvas.xMax),
      Math.floor(Math.random() * this.canvas.yMax),
    ];

    return containsCoordinates(this.snake, coordinates)
      ? this.createPoint()
      : coordinates;
  }

  createGrid(values) {
    const grid = [];

    for (let y = 0; y < this.canvas.yMax; y++) {
      const row = [];

      for (let x = 0; x < this.canvas.xMax; x++) {
        row.push(Array.isArray(values) && Array.isArray(values[y])
          ? values[y][x]  // User specified heuristic value
          : null          // Filler for initial render
        );
      }

      grid.push(row);
    }

    this.snake.forEach(([x, y], i) =>
      grid[y][x] = i === 0 ? CHAR_SNAKE_HEAD : CHAR_SNAKE_TAIL
    );

    grid[this.point[1]][this.point[0]] = CHAR_POINT;

    return grid;
  }

  getPossibleCells() {
    return [
      [this.snake[0][0], this.snake[0][1] - 1],
      [this.snake[0][0] + 1, this.snake[0][1]],
      [this.snake[0][0], this.snake[0][1] + 1],
      [this.snake[0][0] - 1, this.snake[0][1]],
    ].filter((cell) =>
      isInBounds(this.canvas.xMax, this.canvas.yMax, cell) &&
        !containsCoordinates(this.snake, cell)
    );
  }

  redraw(values) {
    this.canvas.draw(this.createGrid(values));
  }

  run() {
    this.sandbox.run({
      fn: this.editor.getValue(),
      env: {
        xMax: this.canvas.xMax,
        yMax: this.canvas.yMax,
        snake: this.snake,
        point: this.point,
      },
    });
  }

  handleMessage({ values }) {
    this.redraw(values);

    if (!this.isRunning) {
      return;
    }

    const cells = this.getPossibleCells();
    const nextCell = cells.sort(([ax, ay], [bx, by]) => values[ay][ax] - values[by][bx])[0];

    if (!nextCell) {
      return this.handleError({
        message: 'The 🐍 did not reach the point. There were no valid cells to move to.',
      });
    }

    this.history = incrementLastElement(this.history);

    if (containsCoordinates(cells, this.point)) {
      this.scoreboard.increase(this.history);
      this.snake = [this.point].concat(this.snake);
      this.point = this.createPoint();
      this.history = this.history.concat([0]);
    } else {
      this.snake = [nextCell].concat(this.snake.slice(0, -1));
    }

    if (this.isPlaying) {
      this.animationFrame = window.requestAnimationFrame(this.boundRun);
    }
  }

  handleError({ message }) {
    this.pause();
    this.console.log(message);
  }
}

module.exports = Game;
