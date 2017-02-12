const containsCoordinates = require('../utils/containsCoordinates');
const incrementLastElement = require('../utils/incrementLastElement');
const isInBounds = require('../utils/isInBounds');
const Sandbox = require('./Sandbox');
const {
  CHAR_SNAKE_HEAD,
  CHAR_SNAKE_TAIL,
  CHAR_POINT,
  SNAKE_LENGTH,
  SPEED_MSECONDS,
} = require('../config');

class Game {
  constructor(canvas, editor, consle, scoreboard) {
    this.canvas = canvas;
    this.editor = editor;
    this.console = consle;
    this.scoreboard = scoreboard;

    this.boundHandleSandboxMessage = this.handleSandboxMessage.bind(this);
    this.boundHandleSandboxError = this.handleSandboxError.bind(this);
    this.boundTick = this.step.bind(this);

    this.sandbox = new Sandbox(
      this.boundHandleSandboxMessage,
      this.boundHandleSandboxError
    );

    this.reset();
  }

  start() {
    this.isRunning = true;
    this.snake = this.createSnake();
    this.point = this.createPoint(this.snake);
    this.history = [0];
    this.run();
  }

  play() {
    this.isRunning = true;
    this.interval = window.setInterval(this.boundTick, SPEED_MSECONDS);
  }

  pause() {
    this.isRunning = false;
    window.clearInterval(this.interval);
  }

  step() {
    this.isRunning = true;
    this.tick();
    this.isRunning = false;
  }

  tick() {
    if (this.isRunning) {
      this.move();
      this.run();
    }
  }

  refresh() {
    this.run();
  }

  reset() {
    this.interval = null;
    this.console.clear();
    this.scoreboard.reset();
    this.sandbox.reset();
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

  handleSandboxMessage({ values }) {
    this.values = values;
    this.canvas.draw(this.createGrid(values));
  }

  handleSandboxError({ message }) {
    this.pause();
    this.console.log(message);
  }

  move() {
    const cells = this.getPossibleCells();
    const nextCell = cells.sort(([ax, ay], [bx, by]) =>
      this.values[ay][ax] - this.values[by][bx])[0];

    if (!nextCell) {
      return this.handleSandboxError({
        message: 'The 🐍 did not reach the point. There were no valid cells to move to.',
      });
    }

    this.history = incrementLastElement(this.history);

    if (containsCoordinates(cells, this.point)) {
      this.scoreboard.increase(this.history);
      this.snake = [this.point].concat(this.snake);
      this.point = this.createPoint(this.snake);
      this.history = this.history.concat([0]);
    } else {
      this.snake = [nextCell].concat(this.snake.slice(0, -1));
    }
  }

  createSnake() {
    return new Array(SNAKE_LENGTH).fill().map((v, i) => [
      Math.floor(this.canvas.xMax / 2) - i,
      Math.floor(this.canvas.yMax / 2),
    ]);
  }

  createPoint(snake) {
    const coordinates = [
      Math.floor(Math.random() * this.canvas.xMax),
      Math.floor(Math.random() * this.canvas.yMax),
    ];

    return containsCoordinates(snake, coordinates)
      ? this.createPoint(snake)
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
}

module.exports = Game;
