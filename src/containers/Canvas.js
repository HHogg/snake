import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  CELL_SIZE,
  CELL_PADDING,
  CHAR_SNAKE_HEAD,
  CHAR_SNAKE_TAIL,
  CHAR_POINT,
} from '../../functions/config';
import { canvasSetSize } from '../store/canvas';
import { gameResetGame, selectGameNowPoint, selectGameNowSnake } from '../store/game';
import getCSSVar from '../utils/getCSSVar';

class CanvasC extends Component {
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
      [CHAR_SNAKE_HEAD]: getCSSVar('cell-snake-head-color'),
      [CHAR_SNAKE_TAIL]: getCSSVar('cell-snake-tail-color'),
      [CHAR_POINT]: getCSSVar('cell-point-color'),
      inactive: getCSSVar('cell-inactive-color'),
      error: getCSSVar('cell-error-color'),
      text: getCSSVar('cell-text-color'),
    };

    this.initDimensions();
    this.context.registerResizeCanvas(() => this.reinitDimensions());
  }

  componentDidUpdate() {
    this.context = this.el.getContext('2d');
    this.redraw(this.props.values);
  }

  initDimensions() {
    const { canvasSetSize, gameResetGame } = this.props;

    const width = this.el.clientWidth;
    const height = this.el.clientHeight;
    const xMax = Math.floor((width + CELL_PADDING) / (CELL_SIZE + CELL_PADDING));
    const yMax = Math.floor((height + CELL_PADDING) / (CELL_SIZE + CELL_PADDING));

    this.padX = (CELL_SIZE + (width - (CELL_SIZE * xMax)) / (xMax - 1));
    this.padY = (CELL_SIZE + (height - (CELL_SIZE * yMax)) / (yMax - 1));

    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;

    this.el.width = width * window.devicePixelRatio;
    this.el.height = height * window.devicePixelRatio;
    this.el.style.width = `${width}px`;
    this.el.style.height = `${height}px`;
    this.ctx = this.el.getContext('2d');
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    canvasSetSize({ xMax, yMax });
    gameResetGame();
  }

  reinitDimensions() {
    this.el.removeAttribute('width');
    this.el.removeAttribute('height');
    this.el.style.width = 'auto';
    this.el.style.height = 'auto';
    this.el.style.minHeight = '0';
    this.el.style.minWidth = '0';
    this.initDimensions();
  }

  drawCell(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.padX, y * this.padY, CELL_SIZE, CELL_SIZE);
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
      this.drawCell(point[0], point[1], this.colorMap[CHAR_POINT]);
    }

    for (let y = 0; y < yMax; y++) {
      for (let x = 0; x < xMax; x++) {
        const value = values && values[y] && values[y][x];

        if (value !== null) {
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
        this.colorMap[i === 0 ? CHAR_SNAKE_HEAD : CHAR_SNAKE_TAIL]);
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

export default connect((state) => ({
  point: selectGameNowPoint(state),
  snake: selectGameNowSnake(state),
  xMax: state.canvas.xMax,
  yMax: state.canvas.yMax,
}), {
  canvasSetSize,
  gameResetGame,
})(CanvasC);
