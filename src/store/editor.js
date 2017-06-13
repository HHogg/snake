import actionCreator from '../utils/actionCreator';

/* eslint-disable max-len */
const initialState = {
  content: `/**
 * @param {Number} x The x coordinate of the cell
 * @param {Number} y The y coordinate of the cell
 * @param {Number} xMax The number of cells across the x axis
 * @param {Number} yMax The number of cells across the y axiom
 * @param {Array[Array[Number]} snake Coordinates of the position of the snake from head to tail. E.g. [[4, 1], [3, 1]]
 * @param {Array[Number]} point Coorodinates of the point.
 */
function heuristic(x, y, xMax, yMax, snake, point) {

  /**
   * This is an example to get you started. It simply returns the standard
   * heuristic 'Mahanttan distance'. However it doesn't take into account
   * its current or future environment.
   */
  return Math.abs(x - point[0]) + Math.abs(y - point[1]);
}
`,
};
/* eslint-enable max-len */

const EDITOR_SET_CONTENT = 'EDITOR_SET_CONTENT';

export const editorSetContent = actionCreator(EDITOR_SET_CONTENT);

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
  case EDITOR_SET_CONTENT:
    return {
      ...state,
      content: payload.content,
    };
  default:
    return state;
  }
}
