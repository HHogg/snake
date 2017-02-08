
(function() {
  /**
   * Ace Editor Custom theme.
   */
  define('ace/theme/asi',['require','exports'], (require, exports) => {
    exports.isDark = true;
    exports.cssClass = 'ace-asi';
  })
  ///////////////////////////////////////

  const LOCAL_STORAGE_KEY = 'asi-snake';

  const CFG = {
    cellSize: 30,
    gridPadding: 5,
    snakeLength: 4,
    speed: 50,
    fnTimeoutSeconds: 10,
  };

  const CHAR_SNAKE_HEAD = 'X';
  const CHAR_SNAKE_TAIL = 'x';
  const CHAR_POINT = '$';

  const initialContent = `
/**
 * @param {Number} x The x coordinate of the cell
 * @param {Number} y The y coordinate of the cell
 * @param {Number} xMax The number of cells across the x axis
 * @param {Number} yMax The number of cells across the y axiom
 * @param {Array[Array[Number]} snake Coordinates of the position of the snake from head to tail. E.g. [[4, 1], [3, 1]]
 * @param {Array[Number]} point Coorodinates of the point.
 */
function heuristic(x, y, xMax, yMax, snake, point) {

  /**
   * This is an example to get you started. It simply returns the standard
   * heuristic 'Mahanttan distance'. However it doesn't take into account
   * its current or future environment.
   */
  return Math.abs(x - point[0]) + Math.abs(y - point[1]);
}
`;

  const canvas = document.getElementById('js__canvas');
  const startButton = document.getElementById('js__start');
  const pauseButton = document.getElementById('js__pause');
  const stepButton = document.getElementById('js__step');
  const playButton = document.getElementById('js__play');
  const resetButton = document.getElementById('js__reset');
  const pointsEl = document.getElementById('js__points');
  const scoreEl = document.getElementById('js__score');
  const movesEl = document.getElementById('js__moves');
  const ideEl = document.getElementById('js__ide');
  const consoleEl = document.getElementById('js__console');

  const ctx = canvas.getContext('2d');

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

  const xMax = Math.floor((width + CFG.gridPadding) / (CFG.cellSize + CFG.gridPadding));
  const yMax = Math.floor((height + CFG.gridPadding) / (CFG.cellSize + CFG.gridPadding));

  const xPadding = (width - (CFG.cellSize * xMax)) / (xMax - 1);
  const yPadding = (height - (CFG.cellSize * yMax)) / (yMax - 1);

  const editor = ace.edit(ideEl);

  editor.setShowPrintMargin(false);
  editor.setShowFoldWidgets(false);
  editor.setHighlightActiveLine(false);
  editor.$blockScrolling = Infinity;
  editor.setTheme('ace/theme/asi');
  editor.getSession().setMode('ace/mode/javascript');
  editor.session.setUseWrapMode(true);
  editor.session.setOptions({
    tabSize: 2,
    useSoftTabs: true,
  });

  editor.setValue(localStorage.getItem(LOCAL_STORAGE_KEY) || initialContent, 1);
  editor.on('change', handleEditorChange);

  let interval;
  let running;
  let point;
  let points;
  let snake;
  let history;
  let score;
  let average;

  startButton.addEventListener('click', handleStart);
  playButton.addEventListener('click', handlePlay);
  pauseButton.addEventListener('click', handlePause);
  stepButton.addEventListener('click', handleStep);
  resetButton.addEventListener('click', handleReset);

  handleReset();

  function handleStart() {
    startButton.setAttribute('disabled', '');
    playButton.removeAttribute('disabled');
    stepButton.removeAttribute('disabled');
    pauseButton.removeAttribute('disabled');
    resetButton.removeAttribute('disabled');
    step();
  }

  function handleReset() {
    snake = createSnake();
    point = createPoint();
    history = [0];
    score = 0;
    points = 0;
    average = 0;
    consoleEl.innerHTML = '';

    clearInterval(interval);
    updateScoreBoard();
    redraw();
  }

  function handlePlay() {
    interval = setInterval(() => {
      step();
    }, CFG.speed);
  }

  function handlePause() {
    clearInterval(interval);
  }

  function handleStep() {
    step();
  }

  function handleEditorChange() {
    localStorage.setItem(LOCAL_STORAGE_KEY, editor.getValue());
  }

  function updateScoreBoard() {
    pointsEl.innerHTML = points;
    movesEl.innerHTML = Math.floor(average);
    scoreEl.innerHTML = Math.floor(score);
  }

  function writeToConsole(message) {
    message = Array.isArray(message)
      ? message.reduce((m, t) => `${m}${JSON.stringify(t)} `, '')
      : message;

    consoleEl.innerHTML += `
      <div class="asi-console__message">
        ${message}
      </div>
    `;

    consoleEl.lastElementChild.scrollIntoView()
  }

  function createSnake() {
    return new Array(CFG.snakeLength).fill().map((v, i) => [
      Math.floor(xMax / 2) - i,
      Math.floor(yMax / 2)
    ]);
  }

  function createPoint() {
    const x = Math.floor(Math.random() * xMax);
    const y = Math.floor(Math.random() * yMax);

    if (snake.some(([sX, sY]) => x === sX && y === sY)) {
      return createPoint(snake);
    }

    return [x, y];
  }

  function createGrid(heuristicValues) {
    const grid = [];

    for (let y = 0; y < yMax; y++) {
      const row = [];
      for (let x = 0; x < xMax; x++) {
        row.push(Array.isArray(heuristicValues) && Array.isArray(heuristicValues[y])
          ? heuristicValues[y][x] // User specified heuristic value
          : null                  // Filler for initial render
        );
      }
      grid.push(row);
    }

    snake.forEach(([x, y], i) =>
      grid[y][x] = i === 0 ? CHAR_SNAKE_HEAD : CHAR_SNAKE_TAIL
    );

    if (Array.isArray(point)) {
      grid[point[1]][point[0]] = CHAR_POINT;
    }

    return grid;
  }

  function getCSSVar(variable) {
    return window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(`--${variable}`)
      .trim();
  }

  function getFillColor(value) {
    return {
      [CHAR_SNAKE_HEAD]: getCSSVar('cell-snake-head-color'),
      [CHAR_SNAKE_TAIL]: getCSSVar('cell-snake-tail-color'),
      [CHAR_POINT]: getCSSVar('cell-point-color'),
    }[value] || getCSSVar('cell-inactive-color');
  }

  function redraw(heuristicValues) {
    const paddedX = (CFG.cellSize + xPadding);
    const paddedY = (CFG.cellSize + yPadding);

    ctx.clearRect(0, 0, width, height);
    createGrid(heuristicValues).forEach((row, y) => {
      row.forEach((value, x) => {
        ctx.fillStyle = getFillColor(value);
        ctx.fillRect(x * paddedX, y * paddedY, CFG.cellSize, CFG.cellSize);

        if (!isNaN(parseInt(value))) {
          ctx.fillStyle = getCSSVar('cell-text-color');
          ctx.textAlign = 'center';
          ctx.font = '12px "Roboto", Helvetica, Arial, sans-serif';
          ctx.fillText(value,
            Math.floor((x * paddedX) + (CFG.cellSize / 2)),
            Math.floor((y * paddedY) + (CFG.cellSize / 2)) + 5
          );
        }
      });
    });
  }

  function calcualteHeuristicValues() {
    return new Promise((resolve, reject) => {
      let sandboxTimeout;
      let sandbox = new Worker('sandbox.js');

      function cleanSandbox() {
        clearTimeout(sandboxTimeout);
        sandbox.terminate();
      }

      function handleError(error) {
        writeToConsole(error);
        cleanSandbox();
        reject(error);
      }

      sandbox.onerror = handleError;

      sandbox.onmessage = ({ data: { action, error, heuristicValues } }) => {
        cleanSandbox();

        const actionFnMap = {
          complete: () => resolve(heuristicValues),
          error: () => handleError(error),
        }[action]();
      };

      sandbox.postMessage({
        action: 'calculate',
        fn: editor.getValue(),
        env: { xMax, yMax, snake, point },
      });

      sandboxTimeout = setTimeout(() => {
        cleanSandbox();
        handleReset();
        writeToConsole(`⏰ Your code exceeded the maximum ${CFG.fnTimeoutSeconds} seconds run time.`);
        reject();
      }, CFG.fnTimeoutSeconds * 1000);
    });
  }

  function move(heuristicValues) {
    const [px, py] = point;
    const cells = [
      [snake[0][0], snake[0][1] - 1],
      [snake[0][0] + 1, snake[0][1]],
      [snake[0][0], snake[0][1] + 1],
      [snake[0][0] - 1, snake[0][1]],
    ];

    history[history.length - 1]++;

    if (isNearPoint(point, cells)) {
      average = calcMedian(history);
      snake = [[px, py]].concat(snake);
      point = createPoint();
      points++;
      score = calcScore(score, history[history.length - 1], points);
      updateScoreBoard();
      history.push(0);

      if (snake.length === (xMax * yMax)) {
        return writeToConsole(`🎉 You did it! Your final score was ${score} with an average move count of ${average} 🎉`);
      }
    } else {
      const nextCell = cells
        .filter(onlyValid)
        .sort((aCell, bCell) => byHeuristic(heuristicValues, aCell, bCell))[0];

      if (!nextCell) {
        handlePause();
        return writeToConsole('The 🐍 did not reach the point. There were no valid cells to move to.');
      }

      snake = [nextCell].concat(snake).slice(0, -1);
    }
  }

  function isNearPoint([px, py], cells) {
    return cells.find(([x, y]) => x === px && y === py);
  }

  function onlyValid([x, y]) {
    return x >= 0 && x < xMax && y >= 0 && y < yMax &&
      !snake.some(([sX, sY]) => x === sX && y === sY);
  }

  function byHeuristic(heuristicValues, [ax, ay], [bx, by]) {
    return heuristicValues[ay][ax] - heuristicValues[by][bx];
  }

  function calcMedian(history) {
    history = history.slice(0).sort((a, b) => a - b);

    if (history.length === 0) {
      avg = 0;
    } else if (history.length === 1) {
      avg = history[0];
    } else if ((history.length / 2) % 1) {
      avg = (history[Math.floor(history.length / 2)] +  history[Math.ceil(history.length / 2)]) / 2;
    } else {
      avg = history[history.length / 2];
    }

    return avg;
  }

  function calcScore(score, lastMoveCount, points) {
    return score + (((xMax * yMax) / lastMoveCount) * points);
  }

  function step() {
    calcualteHeuristicValues()
      .then((heuristicValues) => {
        redraw(heuristicValues);
        move(heuristicValues);
      })
      .catch(() => {
        handlePause();
      });
  }
})();
