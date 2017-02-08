onmessage = ({ data }) => {
  const { fn, env } = data;
  const { xMax, yMax, snake, point } = env;
  const heuristicValues = [];

  try {
    const heuristicFn = eval(`(function() {${fn}; return heuristic; })();`);

    for (let y = 0; y < yMax; y++) {
      heuristicValues[y] = [];

      for (let x = 0; x < xMax; x++) {
        heuristicValues[y][x] = heuristicFn(x, y, xMax, yMax, snake, point);

        if (isNaN(parseInt(heuristicValues[y][x]))) {
          postMessage({
            action: 'error',
            error: `[${x},${y}] returned "${heuristicValues[y][x]}". This is not a number`,
          });
        }
      }
    }

  } catch(error) {
    console.error(error);
    postMessage({
      action: 'error',
      error: error.message,
    });
  }

  postMessage({
    action: 'complete',
    heuristicValues,
  });
};

