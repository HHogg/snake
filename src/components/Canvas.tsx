import * as React from 'react';
import { colorNegativeShade2, colorPositiveShade2, colorWhite, themes, Flex, useResizeObserver } from 'preshape';
import { CANVAS_SIZE } from '../config';
import { Point, Snake, Values } from '../Types';
import getGradientColor from '../utils/getGradientColor';
import { RootContext } from './Root';

interface Props {
  point?: Point | null;
  snake?: Snake;
  values: null | Values;
}

export default (props: Props) => {
  const { point, snake, values } = props;
  const { theme } = React.useContext(RootContext);
  const [{ height, width }, refContainer] = useResizeObserver();
  const cellStep = Math.floor(Math.min(height / CANVAS_SIZE, width / CANVAS_SIZE));
  const cellPadding = cellStep * 0.1;
  const cellSize = cellStep - cellPadding;
  const offsetX = (width - (cellStep * CANVAS_SIZE)) / 2;
  const offsetY = (height - (cellStep * CANVAS_SIZE)) / 2;

  const refCanvas = React.useRef<HTMLCanvasElement>(null);

  const redraw = () => {
    if (refCanvas.current) {
      const ctx = refCanvas.current.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        for (let y = 0; y < CANVAS_SIZE; y++) {
          for (let x = 0; x < CANVAS_SIZE; x++) {
            const value = values && values[y] && values[y][x];
            const color = value !== '_S_' && value !== null && isNaN(value)
              ? colorNegativeShade2
              : themes[theme].colorBackgroundShade2;

            ctx.fillStyle = color;
            ctx.fillRect(offsetX + x * cellStep, offsetY + y * cellStep, cellSize, cellSize);
          }
        }

        if (point) {
          ctx.fillStyle = colorPositiveShade2;
          ctx.fillRect(offsetX + point[0] * cellStep, offsetY + point[1] * cellStep, cellSize, cellSize);
        }

        for (let y = 0; y < CANVAS_SIZE; y++) {
          for (let x = 0; x < CANVAS_SIZE; x++) {
            const value = values && values[y] && values[y][x];

            if (value !== null && value !== '_S_') {
              ctx.fillStyle = colorWhite;
              ctx.textAlign = 'center';
              ctx.font = '"Courier New", Courier, monospace';
              ctx.fillText(isNaN(value) ? 'NaN' : (+value.toFixed(2)).toString(),
                Math.floor((offsetX + x * cellStep) + (cellSize / 2)),
                Math.floor((offsetY + y * cellStep) + (cellSize / 2)) + 5
              );
            }
          }
        }

        if (snake) {
          for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = getGradientColor(theme, ((snake.length - 1) - i) / snake.length);
            ctx.fillRect(offsetX + snake[i][0] * cellStep, offsetY + snake[i][1] * cellStep, cellSize, cellSize);
          }
        }
      }
    }
  };

  React.useEffect(redraw, [point, snake, theme, values]);

  React.useLayoutEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.width = width * window.devicePixelRatio;
      refCanvas.current.height = height * window.devicePixelRatio;
      refCanvas.current.style.width = `${width}px`;
      refCanvas.current.style.height = `${height}px`;
      refCanvas.current.getContext('2d')?.scale(window.devicePixelRatio, window.devicePixelRatio);
      redraw();
    }
  }, [refCanvas.current, height, width]);

  return (

    <Flex container grow ref={ refContainer }>
      <Flex absolute="fullscreen" ref={ refCanvas } tag="canvas" />
    </Flex>
  );
};
