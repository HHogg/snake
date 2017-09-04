onmessage = ({ data }) => {
  const { fn, env } = data;
  const { xMax, yMax, snake, point } = env;
  const values = [];
  const snakeMap = {};

  for (let i = 0; i < snake.length; i++) {
    snakeMap[snake[i]] = true;
  }

  try {
    const heuristicFn = eval(`(function() {${fn}; return heuristic; })();`);

    for (let y = 0; y < yMax; y++) {
      values[y] = [];

      for (let x = 0; x < xMax; x++) {
        if (!snakeMap[[x,y]]) {
          values[y][x] = heuristicFn([x, y], xMax, yMax, snake, point);

          if (isNaN(parseInt(values[y][x]))) {
            values[y][x] = NaN;
          }
        } else {
          values[y][x] = '_S_';
        }
      }
    }

  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    /* eslint-enable no-console */
  }

  postMessage({ values });
};
