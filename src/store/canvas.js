import { createAction, handleActions } from '../utils/reduxActions';

const initialState = {
  xMax: 0,
  yMax: 0,
};

const CANVAS_SET_SIZE = 'CANVAS_SET_SIZE';

export const canvasSetSize = createAction(CANVAS_SET_SIZE
  , ({ xMax, yMax }) => ({ xMax, yMax }));

export default handleActions({
  [CANVAS_SET_SIZE]: (_, { payload }) => ({
    xMax: payload.xMax,
    yMax: payload.yMax,
  }),
}, initialState);
