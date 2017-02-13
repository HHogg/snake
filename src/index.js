require('normalize.css');
require('./style.css');

const Canvas = require('./game/Canvas');
const Console = require('./game/Console');
const Editor = require('./game/Editor');
const Scoreboard = require('./game/Scoreboard');
const Game = require('./game/Game');

const elements = {
  average: document.getElementById('js__average'),
  canvas: document.getElementById('js__canvas'),
  console: document.getElementById('js__console'),
  editor: document.getElementById('js__editor'),
  points: document.getElementById('js__points'),
  score: document.getElementById('js__score'),
};

const buttons = {
  clear: document.getElementById('js__console-clear'),
  play:  document.getElementById('js__play'),
  pause: document.getElementById('js__pause'),
  reset: document.getElementById('js__reset'),
  start: document.getElementById('js__start'),
  step: document.getElementById('js__step'),
  refresh: document.getElementById('js__refresh'),
};

const canvas = new Canvas(elements.canvas);
const editor = new Editor(elements.editor);
const consle = new Console(elements.console);
const scoreboard = new Scoreboard(elements.average, elements.points, elements.score, canvas);
const game = new Game(canvas, editor, consle, scoreboard, {
  onGameOver: () => {
    buttons.play.setAttribute('disabled', '');
    buttons.pause.setAttribute('disabled', '');
    buttons.reset.removeAttribute('disabled');
    buttons.start.setAttribute('disabled', '');
    buttons.step.setAttribute('disabled', '');
    buttons.refresh.setAttribute('disabled', '');
  },
});

buttons.start.addEventListener('click', () => {
  buttons.play.removeAttribute('disabled');
  buttons.pause.setAttribute('disabled', '');
  buttons.reset.removeAttribute('disabled');
  buttons.start.setAttribute('disabled', '');
  buttons.step.removeAttribute('disabled');
  buttons.refresh.removeAttribute('disabled');
  game.start();
});

buttons.reset.addEventListener('click', () => {
  buttons.play.setAttribute('disabled', '');
  buttons.pause.setAttribute('disabled', '');
  buttons.reset.setAttribute('disabled', '');
  buttons.start.removeAttribute('disabled');
  buttons.step.setAttribute('disabled', '');
  buttons.refresh.setAttribute('disabled', '');
  game.reset();
});

buttons.play.addEventListener('click', () => {
  buttons.play.setAttribute('disabled', '');
  buttons.step.setAttribute('disabled', '');
  buttons.refresh.setAttribute('disabled', '');
  buttons.pause.removeAttribute('disabled');
  game.play();
});

buttons.pause.addEventListener('click', () => {
  buttons.play.removeAttribute('disabled');
  buttons.step.removeAttribute('disabled');
  buttons.refresh.removeAttribute('disabled');
  buttons.pause.setAttribute('disabled', '');
  game.pause();
});

buttons.step.addEventListener('click', () => game.step());
buttons.refresh.addEventListener('click', () => game.refresh());
buttons.clear.addEventListener('click', () => consle.clear());
