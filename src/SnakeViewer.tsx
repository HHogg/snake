import * as React from 'react';
import {
  colorNegativeShade2,
  colorPositiveShade2,
  colorWhite,
  themes,
  useResizeObserver,
  Box,
  BoxProps,
  TypeTheme,
} from 'preshape';
import { SnakeContext } from './Snake';
import getGradientColor from './utils/getGradientColor';

interface Props extends BoxProps {
  theme: TypeTheme;
}

const padding = 0;

const SnakeViewer: React.FC<Props> = (props) => {
  const { theme, ...rest } = props;
  const { point, snake, values, xLength, yLength } = React.useContext(SnakeContext);

  const [{ height, width }, refContainer] = useResizeObserver();
  const refCanvas = React.useRef<HTMLCanvasElement>(null);

  const cellStep = Math.floor(Math.min((height - padding * 2) / yLength, (width - padding * 2) / xLength));
  const cellPadding = cellStep * 0.1;
  const cellSize = cellStep - cellPadding;
  const offsetX = padding + ((width - (cellStep * xLength)) / 2);
  const offsetY = padding + ((height - (cellStep * yLength)) / 2);

  const redraw = () => {
    if (refCanvas.current) {
      const ctx = refCanvas.current.getContext('2d');

      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = themes[theme].colorBackgroundShade1;
        ctx.fillRect(offsetX - padding, offsetY - padding, (cellStep * xLength) + padding, (cellStep * yLength) + padding);

        for (let y = 0; y < yLength; y++) {
          for (let x = 0; x < xLength; x++) {
            const value = values && values[y] && values[y][x];
            const color = value !== undefined && isNaN(value)
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

        for (let y = 0; y < yLength; y++) {
          for (let x = 0; x < xLength; x++) {
            const value = values && values[y] && values[y][x];

            if (value !== undefined) {
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
    <Box { ...rest } container grow ref={ refContainer }>
      <Box absolute="edge-to-edge" ref={ refCanvas } tag="canvas" />
    </Box>
  );
};

export default SnakeViewer;
