import actionCreator from '../utils/actionCreator';

const initialState = {
  xMax: 0,
  yMax: 0,
};

const CANVAS_SET_SIZE = 'CANVAS_SET_SIZE';

export const canvasSetSize = actionCreator(CANVAS_SET_SIZE);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CANVAS_SET_SIZE:
    return {
      ...state,
      xMax: payload.xMax,
      yMax: payload.yMax,
    };
  default:
    return state;
  }
};
