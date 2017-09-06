import { connect } from 'react-redux';
import { canvasSetSize } from '../../store/canvas';
import { gameResetGame, selectGameNowPoint, selectGameNowSnake } from '../../store/game';
import Canvas from './Canvas';

export default connect((state) => ({
  point: selectGameNowPoint(state),
  snake: selectGameNowSnake(state),
  xMax: state.canvas.xMax,
  yMax: state.canvas.yMax,
}), {
  canvasSetSize,
  gameResetGame,
})(Canvas);
