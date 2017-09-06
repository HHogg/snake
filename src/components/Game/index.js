import { connect } from 'react-redux';
import { consoleAddMessage } from '../../store/console';
import {
  gameCollectPoint,
  gameMoveSnakeBackwards,
  gameMoveSnakeForwards,
  gamePauseGame,
  gamePopHistory,
  gameResetGame,
  gameSetEnvironment,
  gameStopGame,
  selectGameNowPoint,
  selectGameNowSnake,
  selectGameNowTails,
  selectGamePrevPoint,
  selectGamePrevSnake,
} from '../../store/game';
import Game from './Game';

export default connect((state) => ({
  content: state.editor.content,
  isLoggedIn: !!state.user.id,
  isPlaying: state.game.isPlaying,
  isRunning: state.game.isRunning,
  point: selectGameNowPoint(state),
  previousPoint: selectGamePrevPoint(state),
  previousSnake: selectGamePrevSnake(state),
  snake: selectGameNowSnake(state),
  tails: selectGameNowTails(state),
  xMax: state.canvas.xMax,
  yMax: state.canvas.yMax,
}), {
  consoleLog: consoleAddMessage,
  onCollectPoint: gameCollectPoint,
  onGameInit: gameSetEnvironment,
  onPauseGame: gamePauseGame,
  onPreviousPoint: gamePopHistory,
  onResetGame: gameResetGame,
  onStepBackwards: gameMoveSnakeBackwards,
  onStepForwards: gameMoveSnakeForwards,
  onStopGame: gameStopGame,
})(Game);
