import React, { Component, PropTypes } from 'react';
import { CELL_SIZE, CELL_PADDING, CLOUD_CANVAS_SIZE } from '../../../functions/config';
import getCSSVar from '../../utils/getCSSVar';
import getGradientColor from '../../utils/getGradientColor';

export default class Canvas extends Component {
  static propTypes = {
    canvasSetSize: PropTypes.func.isRequired,
    gameResetGame: PropTypes.func.isRequired,
    point: PropTypes.array,
    snake: PropTypes.array,
    values: PropTypes.array,
    xMax: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
  };

  static contextTypes = {
    registerResizeCanvas: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.colorMap = {
      point: getCSSVar('cell-point-color'),
      inactive: getCSSVar('cell-inactive-color'),
      error: getCSSVar('cell-error-color'),
      text: getCSSVar('cell-text-color'),
    };

    this.initDimensions();
  }

  componentDidUpdate() {
    this.context = this.el.getContext('2d');
    this.redraw(this.props.values);
  }

  initDimensions() {
    const { canvasSetSize, gameResetGame } = this.props;

    this.width = (CLOUD_CANVAS_SIZE * (CELL_SIZE + CELL_PADDING)) - CELL_PADDING;
    this.height = this.width;
    this.padX = (CELL_SIZE + (this.width - (CELL_SIZE *
      CLOUD_CANVAS_SIZE)) / (CLOUD_CANVAS_SIZE - 1));
    this.padY = (CELL_SIZE + (this.height - (CELL_SIZE *
      CLOUD_CANVAS_SIZE)) / (CLOUD_CANVAS_SIZE - 1));
    this.el.width = this.width * window.devicePixelRatio;
    this.el.height = this.height * window.devicePixelRatio;
    this.el.style.width = `${this.width}px`;
    this.el.style.height = `${this.height}px`;
    this.ctx = this.el.getContext('2d');
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    canvasSetSize({
      xMax: CLOUD_CANVAS_SIZE,
      yMax: CLOUD_CANVAS_SIZE,
    });
    gameResetGame();
  }

  drawCell(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.padX,
      y * this.padY,
      CELL_SIZE,
      CELL_SIZE
    );
  }

  redraw(values) {
    const { point, snake, xMax, yMax } = this.props;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let y = 0; y < yMax; y++) {
      for (let x = 0; x < xMax; x++) {
        const value = values && values[y] && values[y][x];
        const color = isNaN(value) && value !== '_S_'
          ? this.colorMap.error
          : this.colorMap.inactive;

        this.drawCell(x, y, color);
      }
    }

    if (point) {
      this.drawCell(point[0], point[1], this.colorMap.point);
    }

    for (let y = 0; y < yMax; y++) {
      for (let x = 0; x < xMax; x++) {
        const value = values && values[y] && values[y][x];

        if (value !== null && value !== '_S_') {
          this.ctx.fillStyle = this.colorMap.text;
          this.ctx.textAlign = 'center';
          this.ctx.font = '"Courier New", Courier, monospace';
          this.ctx.fillText(isNaN(value) ? 'NaN' : +value.toFixed(2),
            Math.floor((x * this.padX) + (CELL_SIZE / 2)),
            Math.floor((y * this.padY) + (CELL_SIZE / 2)) + 5
          );
        }
      }
    }

    for (let i = 0; i < snake.length; i++) {
      this.drawCell(snake[i][0], snake[i][1],
        getGradientColor(((snake.length - 1) - i) / snake.length));
    }
  }

  render() {
    return (
      <canvas
          ref={ (el) => this.el = el }
          style={ { flex: '1 1 0%', minHeight: '0', minWidth: '0' } } />
    );
  }
}
