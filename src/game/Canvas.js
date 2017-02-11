require('./Canvas.css');

const getCSSVar = require('../utils/getCSSVar');
const {
  CELL_SIZE,
  CELL_PADDING,
  CHAR_SNAKE_HEAD,
  CHAR_SNAKE_TAIL,
  CHAR_POINT,
} = require('../config');

const colorMap = {
  [CHAR_SNAKE_HEAD]: getCSSVar('cell-snake-head-color'),
  [CHAR_SNAKE_TAIL]: getCSSVar('cell-snake-tail-color'),
  [CHAR_POINT]: getCSSVar('cell-point-color'),
  inactive: getCSSVar('cell-inactive-color'),
};

class Canvas {
  constructor(element) {
    this.element = element;
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.context = this.element.getContext('2d');
    this.element.width = this.width * window.devicePixelRatio;
    this.element.height = this.height * window.devicePixelRatio;
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);

    this.xMax = Math.floor((this.width + CELL_PADDING) / (CELL_SIZE + CELL_PADDING));
    this.yMax = Math.floor((this.height + CELL_PADDING) / (CELL_SIZE + CELL_PADDING));
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  draw(grid) {
    const paddedX = (CELL_SIZE + (this.width - (CELL_SIZE * this.xMax)) / (this.xMax - 1));
    const paddedY = (CELL_SIZE + (this.height - (CELL_SIZE * this.yMax)) / (this.yMax - 1));

    this.clear();

    grid.forEach((row, y) => {
      row.forEach((value, x) => {
        this.context.fillStyle = colorMap[value] || colorMap.inactive;
        this.context.fillRect(x * paddedX, y * paddedY, CELL_SIZE, CELL_SIZE);

        if (!isNaN(parseInt(value))) {
          this.context.fillStyle = getCSSVar('cell-text-color');
          this.context.textAlign = 'center';
          this.context.font = '"Courier New", Courier, monospace';
          this.context.fillText(+value.toFixed(2),
            Math.floor((x * paddedX) + (CELL_SIZE / 2)),
            Math.floor((y * paddedY) + (CELL_SIZE / 2)) + 5
          );
        }
      });
    });
  }
}

module.exports = Canvas;
