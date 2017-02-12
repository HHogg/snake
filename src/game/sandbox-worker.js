onmessage = ({ data }) => {
  const { fn, env } = data;
  const { xMax, yMax, snake, point } = env;
  const values = [];

  try {
    const heuristicFn = eval(`(function() {${fn}; return heuristic; })();`);

    for (let y = 0; y < yMax; y++) {
      values[y] = [];

      for (let x = 0; x < xMax; x++) {
        values[y][x] = heuristicFn(x, y, xMax, yMax, snake, point);

        if (isNaN(parseInt(values[y][x]))) {
          throw new Error(`[${x},${y}] returned "${values[y][x]}". This is not a number`);
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

