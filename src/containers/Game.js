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
import Flex from '../components/Flex/Flex';
import Canvas from './Canvas';
import Console from './Console';
import Controller from './Controller';
import Editor from './Editor';
import Scoreboard from './Scoreboard';
import SolutionTitle from './SolutionTitle';
import { createEnvironment, createPoint } from '../../functions/common/createEnvironment';
import containsCoordinates from '../../functions/common/containsCoordinates';
import getSurroundingCells from '../../functions/common/getSurroundingCells';
import Sandbox from '../utils/Sandbox';

class Game extends Component {
  static propTypes = {
    consoleLog: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    history: PropTypes.array.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onCollectPoint: PropTypes.func.isRequired,
    onGameInit: PropTypes.func.isRequired,
    onPauseGame: PropTypes.func.isRequired,
    onResetGame: PropTypes.func.isRequired,
    onStepBackwards: PropTypes.func.isRequired,
    onStepForwards: PropTypes.func.isRequired,
    onStopGame: PropTypes.func.isRequired,
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
    const { onGameInit, isRunning, isPlaying } = this.props;

    if (!next.snake && !next.point) {
      onGameInit(createEnvironment(next.xMax, next.yMax));
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
      consoleLog,
      onCollectPoint,
      onStepForwards,
      onStopGame,
      point,
      snake,
      xMax,
      yMax,
    } = this.props;

    if (!Array.isArray(values)) {
      return consoleLog({
        message: '🔥 There were no heuristic values to calculate a move 🔥',
      });
    }

    const cells = getSurroundingCells(snake, xMax, yMax);
    const nextCell = cells.sort(([ax, ay], [bx, by]) => values[ay][ax] - values[by][bx])[0];

    if (!nextCell) {
      onStopGame();

      return consoleLog({
        message: 'The 🐍 did not reach the point. There were no valid cells to move to.',
      });
    }

    let nextSnake;
    let nextPoint = point;

    if (containsCoordinates(cells, point)) {
      nextSnake = [point, ...snake];
      nextPoint = createPoint(xMax, yMax, nextSnake);
      onCollectPoint({
        point: nextPoint,
        snake: nextSnake,
        xMax,
        yMax,
      });
    } else {
      nextSnake = [nextCell, ...snake.slice(0, -1)];
      onStepForwards({
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
    const { consoleLog, onPauseGame } = this.props;

    onPauseGame();
    consoleLog({ message });
  }

  handleRefresh() {
    this.run(this.props);
  }

  handleStepForwards() {
    this.move();
  }

  handleStepBackwards() {
    const { onStepBackwards } = this.props;

    onStepBackwards();
  }

  handleReset() {
    const { onResetGame } = this.props;

    this.setState({ values: null });
    onResetGame();
  }

  render() {
    const { values } = this.state;

    return (
      <Flex container direction="vertical">
        <Flex shrink>
          <SolutionTitle />
        </Flex>

        <Flex container>
          <Flex container direction="vertical">
            <Flex container>
              <Canvas values={ values } />
            </Flex>

            <Flex shrink>
              <Console />
            </Flex>

            <Flex shrink>
              <Scoreboard />
            </Flex>

            <Flex shrink>
              <Controller
                  onRefresh={ () => this.handleRefresh() }
                  onReset={ () => this.handleReset() }
                  onStepBackwards={ () => this.handleStepBackwards() }
                  onStepForwards={ () => this.handleStepForwards() } />
            </Flex>
          </Flex>

          <Flex>
            <Editor />
          </Flex>
        </Flex>
      </Flex>
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
  consoleLog: consoleAddMessage,
  onCollectPoint: gameCollectPoint,
  onGameInit: gameSetEnvironment,
  onPauseGame: gamePauseGame,
  onResetGame: gameResetGame,
  onStepBackwards: gameMoveSnakeBackwards,
  onStepForwards: gameMoveSnakeForwards,
  onStopGame: gameStopGame,
})(Game);
