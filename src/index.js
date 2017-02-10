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
  play:  document.getElementById('js__play'),
  pause: document.getElementById('js__pause'),
  reset: document.getElementById('js__reset'),
  start: document.getElementById('js__start'),
  step: document.getElementById('js__step'),
};

const canvas = new Canvas(elements.canvas);
const editor = new Editor(elements.editor);
const consle = new Console(elements.console);
const scoreboard = new Scoreboard(elements.average, elements.points, elements.score, canvas);
const game = new Game(canvas, editor, consle, scoreboard);

function setAciveButtonStates() {
  buttons.play.removeAttribute('disabled');
  buttons.pause.removeAttribute('disabled');
  buttons.reset.removeAttribute('disabled');
  buttons.start.setAttribute('disabled', '');
  buttons.step.removeAttribute('disabled');
}

function setInaciveButtonStates() {
  buttons.play.setAttribute('disabled', '');
  buttons.pause.setAttribute('disabled', '');
  buttons.reset.setAttribute('disabled', '');
  buttons.start.removeAttribute('disabled');
  buttons.step.setAttribute('disabled', '');
}


buttons.start.addEventListener('click', () => {
  setAciveButtonStates();
  game.start();
});

buttons.reset.addEventListener('click', () => {
  setInaciveButtonStates();
  game.reset();
});

buttons.play.addEventListener('click', () => game.play());
buttons.pause.addEventListener('click', () => game.pause());
buttons.step.addEventListener('click', () => game.step());
