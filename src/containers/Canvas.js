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
import getCSSVar from '../utils/getCSSVar';

class CanvasC extends Component {
  static propTypes = {
    canvasSetSize: PropTypes.func.isRequired,
    point: PropTypes.array,
    snake: PropTypes.array,
    values: PropTypes.array,
    xMax: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
  };

  componentDidMount() {
    const { canvasSetSize } = this.props;
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    this.el.width = width * window.devicePixelRatio;
    this.el.height = height * window.devicePixelRatio;
    this.el.style.width = `${width}px`;
    this.el.style.height = `${height}px`;
    this.context = this.el.getContext('2d');
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);

    canvasSetSize({
      xMax: Math.floor((this.width + CELL_PADDING) / (CELL_SIZE + CELL_PADDING)),
      yMax: Math.floor((this.height + CELL_PADDING) / (CELL_SIZE + CELL_PADDING)),
    });

    this.colorMap = {
      [CHAR_SNAKE_HEAD]: getCSSVar('cell-snake-head-color'),
      [CHAR_SNAKE_TAIL]: getCSSVar('cell-snake-tail-color'),
      [CHAR_POINT]: getCSSVar('cell-point-color'),
      inactive: getCSSVar('cell-inactive-color'),
      text: getCSSVar('cell-text-color'),
    };
  }

  componentDidUpdate() {
    this.context = this.el.getContext('2d');
    this.redraw();
  }

  redraw() {
    const { point, snake, values, xMax, yMax } = this.props;
    const paddedX = (CELL_SIZE + (this.width - (CELL_SIZE * xMax)) / (xMax - 1));
    const paddedY = (CELL_SIZE + (this.height - (CELL_SIZE * yMax)) / (yMax - 1));

    this.context.clearRect(0, 0, this.width, this.height);

    for (let y = 0; y < yMax; y++) {
      for (let x = 0; x < xMax; x++) {
        const value = values && values[y][x];

        this.context.fillStyle = this.colorMap.inactive;
        this.context.fillRect(x * paddedX, y * paddedY, CELL_SIZE, CELL_SIZE);

        if (!isNaN(parseInt(value))) {
          this.context.fillStyle = this.colorMap.text;
          this.context.textAlign = 'center';
          this.context.font = '"Courier New", Courier, monospace';
          this.context.fillText(+value.toFixed(2),
            Math.floor((x * paddedX) + (CELL_SIZE / 2)),
            Math.floor((y * paddedY) + (CELL_SIZE / 2)) + 5
          );
        }
      }
    }

    for (let i = 0; i < snake.length; i++) {
      this.context.fillStyle = this.colorMap[i === 0 ? CHAR_SNAKE_HEAD : CHAR_SNAKE_TAIL];
      this.context.fillRect(snake[i][0] * paddedX, snake[i][1] * paddedY, CELL_SIZE, CELL_SIZE);
    }

    if (point) {
      this.context.fillStyle = this.colorMap[CHAR_POINT];
      this.context.fillRect(point[0] * paddedX, point[1] * paddedY, CELL_SIZE, CELL_SIZE);
    }
  }

  render() {
    return (
      <canvas
          className="sh-canvas"
          ref={ (el) => this.el = el }
          style={ { flex: '1 1 0%' } } />
    );
  }
}

export default connect((state) => ({
  point: state.game.point,
  snake: state.game.snake,
  xMax: state.canvas.xMax,
  yMax: state.canvas.yMax,
}), {
  canvasSetSize,
})(CanvasC);
