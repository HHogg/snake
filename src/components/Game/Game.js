import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { createEnvironment, createPoint } from '../../../functions/common/createEnvironment';
import containsCoordinates from '../../../functions/common/containsCoordinates';
import getSurroundingCells from '../../../functions/common/getSurroundingCells';
import Sandbox from '../../utils/Sandbox';
import AbsoluteChild from '../Layout/AbsoluteChild';
import Canvas from '../Canvas';
import Console from '../Console';
import Controller from '../Controller';
import Editor from '../Editor';
import Flex from '../Flex/Flex';
import Scoreboard from '../Scoreboard';
import SolutionTitle from '../SolutionTitle';

export default class Game extends Component {
  static propTypes = {
    consoleLog: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onCollectPoint: PropTypes.func.isRequired,
    onGameInit: PropTypes.func.isRequired,
    onPauseGame: PropTypes.func.isRequired,
    onPreviousPoint: PropTypes.func.isRequired,
    onResetGame: PropTypes.func.isRequired,
    onStepBackwards: PropTypes.func.isRequired,
    onStepForwards: PropTypes.func.isRequired,
    onStopGame: PropTypes.func.isRequired,
    point: PropTypes.array,
    previousPoint: PropTypes.array,
    previousSnake: PropTypes.array,
    snake: PropTypes.array,
    tails: PropTypes.array,
    xMax: PropTypes.number.isRequired,
    yMax: PropTypes.number.isRequired,
  };

  static childContextTypes = {
    registerResizeCanvas: PropTypes.func.isRequired,
    registerResizeEditor: PropTypes.func.isRequired,
  };

  getChildContext() {
    return {
      registerResizeCanvas: (func) => this.resizeCanvas = func,
      registerResizeEditor: (func) => this.resizeEditor = func,
    };
  }

  constructor(props) {
    super(props);

    this.state = { values: null };
  }

  componentWillMount() {
    this.handleResize = debounce(() => {
      this.resizeCanvas && this.resizeCanvas();
      this.resizeEditor && this.resizeEditor();
    }, 500);

    this._sandbox = new Sandbox(
      this.handleSandboxMessage.bind(this),
      this.handleSandboxError.bind(this),
    );

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.handleResize);
    }
  }

  componentWillReceiveProps(next) {
    const { onGameInit, isRunning, isPlaying } = this.props;

    if (!next.snake && !next.point) {
      this.setState({ values: null });
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

  componentWillUnmount() {
    this._unmounting = true;

    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.handleResize);
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
      onStopGame();

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

    if (containsCoordinates([nextCell], point)) {
      nextSnake = [point, ...snake];

      if (nextSnake.length === (xMax * yMax)) {
        onStopGame();
        onCollectPoint({
          point: null,
          snake: nextSnake,
          xMax,
          yMax,
        });

        return consoleLog({
          message: '🎉 You have conquered Snake! 🎉 Submit your solution to the Leaderboard '
            + 'and see how your average compares.',
        });
      }

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
    if (!this._unmounting) {
      this.setState({ values });

      window.requestAnimationFrame(() => {
        if (this.props.isRunning) {
          this.move();
        }
      });
    }
  }

  handleSandboxError({ message }) {
    const { consoleLog, onPauseGame } = this.props;

    onPauseGame();
    consoleLog({ message });
  }

  handleRefresh(snake = this.props.snake, point = this.props.point) {
    this.run({ ...this.props, point, snake });
  }

  handleStepForwards() {
    this.move();
  }

  handleStepBackwards() {
    const {
      onPreviousPoint,
      onStepBackwards,
      previousPoint,
      previousSnake,
      snake,
      tails,
    } = this.props;

    if (tails.length) {
      const nextSnake = [...snake.slice(1), tails[0]];
      onStepBackwards();
      this.handleRefresh(nextSnake);
    } else if (previousSnake && previousPoint) {
      onPreviousPoint();
      this.handleRefresh(previousSnake, previousPoint);
    }
  }

  handleReset() {
    const { onResetGame } = this.props;

    this.setState({ values: null });
    onResetGame();
  }

  render() {
    const { values } = this.state;

    return (
      <AbsoluteChild type="full">
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

          <Flex container direction="vertical">
            <Flex shrink>
              <SolutionTitle />
            </Flex>

            <Flex container>
              <Editor />
            </Flex>
          </Flex>
        </Flex>
      </AbsoluteChild>
    );
  }
}
