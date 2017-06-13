import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  gamePauseGame,
  gamePlayGame,
  gameStartGame,
} from '../store/game';
import Button from '../components/Button/Button';
import ButtonGroup from '../components/Button/ButtonGroup';
import Controls from '../components/Controls/Controls';
import ControlGroup from '../components/Controls/ControlGroup';
import Icon from '../components/Icon/Icon';

class Controller extends Component {
  static propTypes = {
    canGoBackwards: PropTypes.bool.isRequired,
    isGameOver: PropTypes.bool.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onStart: PropTypes.func.isRequired,
    onStepBackwards: PropTypes.func.isRequired,
    onStepForwards: PropTypes.func.isRequired,
  };

  render() {
    const {
      canGoBackwards,
      isGameOver,
      isPlaying,
      isRunning,
      onPause,
      onPlay,
      onRefresh,
      onReset,
      onStart,
      onStepBackwards,
      onStepForwards,
    } = this.props;

    return (
      <Controls>
        <ControlGroup>
          <ButtonGroup>
            <Button
                color="green"
                disabled={ isGameOver || isPlaying }
                onClick={ () => onStart() }>
              Start
            </Button>
          </ButtonGroup>
        </ControlGroup>

        <ControlGroup>
          <ButtonGroup>
            <Button
                color="blue"
                disabled={ !canGoBackwards || !isPlaying || isRunning }
                onClick={ () => onStepBackwards() }>
              <Icon name="step-backwards" />
            </Button>

            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onPlay() }>
              <Icon name="play" />
            </Button>

            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || !isRunning }
                onClick={ () => onPause() }>
              <Icon name="pause" />
            </Button>

            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onStepForwards() }>
              <Icon name="step-forwards" />
            </Button>
          </ButtonGroup>
        </ControlGroup>

        <ControlGroup>
          <ButtonGroup>
            <Button
                color="blue"
                disabled={ isGameOver || !isPlaying || isRunning }
                onClick={ () => onRefresh() }>
              <Icon name="refresh" />
            </Button>
          </ButtonGroup>
        </ControlGroup>

        <ControlGroup>
          <ButtonGroup>
            <Button
                color="red"
                disabled={ !isPlaying }
                onClick={ () => onReset() }>
              Reset
            </Button>
          </ButtonGroup>
        </ControlGroup>
      </Controls>
    );
  }
}

export default connect((state) => ({
  canGoBackwards: state.game.tails.length > 0,
  isGameOver: state.game.isGameOver,
  isPlaying: state.game.isPlaying,
  isRunning: state.game.isRunning,
}), {
  onPause: gamePauseGame,
  onPlay: gamePlayGame,
  onStart: gameStartGame,
})(Controller);
