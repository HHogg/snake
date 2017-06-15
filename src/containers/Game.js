import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { consoleAddMessage } from '../store/console';
import {
  gameCollectPoint,
  gameMoveSnakeBackwards,
  gameMoveSnakeForwards,
  gamePauseGame,
  gameResetGame,
  gameSetEnvironment,
  gameStopGame,
} from '../store/game';
import App from '../components/App/App';
import AppHeader from '../components/App/AppHeader';
import AppPane from '../components/App/AppPane';
import AppTitle from '../components/App/AppTitle';
import AppBody from '../components/App/AppBody';
import AppSection from '../components/App/AppSection';
import GithubLink from '../components/GithubLink/GithubLink';
import Canvas from './Canvas';
import Console from './Console';
import Controller from './Controller';
import Editor from './Editor';
import Scoreboard from './Scoreboard';
import UserMenu from './UserMenu';
import { createEnvironment, createPoint } from '../utils/createEnvironment';
import containsCoordinates from '../utils/containsCoordinates';
import getSurroundingCells from '../utils/getSurroundingCells';
import Sandbox from '../utils/Sandbox';

class Game extends Component {
  static propTypes = {
    consoleAddMessage: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    gameCollectPoint: PropTypes.func.isRequired,
    gameMoveSnakeBackwards: PropTypes.func.isRequired,
    gameMoveSnakeForwards: PropTypes.func.isRequired,
    gamePauseGame: PropTypes.func.isRequired,
    gameResetGame: PropTypes.func.isRequired,
    gameSetEnvironment: PropTypes.func.isRequired,
    gameStopGame: PropTypes.func.isRequired,
    history: PropTypes.array.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    point: PropTypes.array,
    snake: PropTypes.array,
    tails: PropTypes.array.isRequired,
    xMax: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { values: null };

    this._sandbox = new Sandbox(
      this.handleSandboxMessage.bind(this),
      this.handleSandboxError.bind(this),
    );
  }

  componentWillReceiveProps(next) {
    const { gameSetEnvironment, isRunning, isPlaying } = this.props;

    if (!next.snake && !next.point) {
      gameSetEnvironment(createEnvironment(next.xMax, next.yMax));
    }

    if (!isRunning && next.isRunning ||
          !isPlaying && next.isPlaying) {
      this.run(next);
    }

    if (isPlaying && !next.isPlaying) {
      this._sandbox.reset();
    }
  }

  run({ content, point, snake, xMax, yMax }) {
    this._sandbox.run({
      fn: content,
      env: { xMax, yMax, snake, point },
    });
  }

  move() {
    const { values } = this.state;
    const {
      consoleAddMessage,
      gameCollectPoint,
      gameMoveSnakeForwards,
      gameStopGame,
      point,
      snake,
      xMax,
      yMax,
    } = this.props;

    if (!Array.isArray(values)) {
      return consoleAddMessage({
        message: '🔥 There were no heuristic values to calculate a move 🔥',
      });
    }

    const cells = getSurroundingCells(snake, xMax, yMax);
    const nextCell = cells.sort(([ax, ay], [bx, by]) => values[ay][ax] - values[by][bx])[0];

    if (!nextCell) {
      gameStopGame();

      return consoleAddMessage({
        message: 'The 🐍 did not reach the point. There were no valid cells to move to.',
      });
    }

    let nextSnake;
    let nextPoint = point;

    if (containsCoordinates(cells, point)) {
      nextSnake = [point, ...snake];
      nextPoint = createPoint(xMax, yMax, nextSnake);
      gameCollectPoint({
        point: nextPoint,
        snake: nextSnake,
        xMax,
        yMax,
      });
    } else {
      nextSnake = [nextCell, ...snake.slice(0, -1)];
      gameMoveSnakeForwards({
        snake: nextSnake,
        tail: snake[snake.length - 1],
      });
    }

    this.run({
      ...this.props,
      point: nextPoint,
      snake: nextSnake,
    });
  }


  handleSandboxMessage({ values }) {
    this.setState({ values });

    window.requestAnimationFrame(() => {
      if (this.props.isRunning) {
        this.move();
      }
    });
  }

  handleSandboxError({ message }) {
    const { consoleAddMessage, gamePauseGame } = this.props;

    gamePauseGame();
    consoleAddMessage({ message });
  }

  handleRefresh() {
    this.run(this.props);
  }

  handleStepForwards() {
    this.move();
  }

  handleStepBackwards() {
    const { gameMoveSnakeBackwards } = this.props;

    gameMoveSnakeBackwards();
  }

  handleReset() {
    const { gameResetGame } = this.props;

    this.setState({ values: null });
    gameResetGame();
  }

  render() {
    const { values } = this.state;

    return (
      <App>
        <AppHeader>
          <AppPane>
            <AppTitle>Snake Heuristics</AppTitle>
          </AppPane>

          <AppPane shrink={ true }>
            <UserMenu />
          </AppPane>
        </AppHeader>

        <AppBody>
          <AppPane>
            <AppSection>
              <Canvas values={ values } />
            </AppSection>

            <AppSection shrink={ true }>
              <Console />
            </AppSection>

            <AppSection shrink={ true }>
              <Scoreboard />
            </AppSection>

            <AppSection shrink={ true }>
              <Controller
                  onRefresh={ () => this.handleRefresh() }
                  onReset={ () => this.handleReset() }
                  onStepBackwards={ () => this.handleStepBackwards() }
                  onStepForwards={ () => this.handleStepForwards() } />
            </AppSection>
          </AppPane>

          <AppPane>
            <AppSection>
              <Editor />
            </AppSection>

            <AppSection align="end" shrink={ true }>
              <GithubLink href="https://github.com/HHogg/snake-heuristics" />
            </AppSection>
          </AppPane>
        </AppBody>
      </App>
    );
  }
}

export default connect((state) => ({
  content: state.editor.content,
  history: state.game.history,
  isPlaying: state.game.isPlaying,
  isRunning: state.game.isRunning,
  point: state.game.point,
  snake: state.game.snake,
  tails: state.game.tails,
  xMax: state.canvas.xMax,
  yMax: state.canvas.yMax,
}), {
  consoleAddMessage,
  gameCollectPoint,
  gameMoveSnakeBackwards,
  gameMoveSnakeForwards,
  gamePauseGame,
  gameResetGame,
  gameSetEnvironment,
  gameStopGame,
})(Game);
