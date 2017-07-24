import actionCreator from '../utils/actionCreator';

/* eslint-disable max-len */
const initialState = {
  edited: false,
  selectedSolutionKey: undefined,
  title: '',
  content: `/**
 * @param {Array[Number]} cell Coordinates of the cell to return a value for
 * @param {Number} xMax The number of cells across the x axis
 * @param {Number} yMax The number of cells across the y axis
 * @param {Array[Array[Number]} snake Coordinates of the position of the snake from head to tail. E.g. [[4, 1], [3, 1]]
 * @param {Array[Number]} point Coorodinates of the point.
 */
function heuristic(cell, xMax, yMax, snake, point) {

  /**
   * This is an example to get you started. It simply returns the standard
   * heuristic 'Manhattan distance'. However it doesn't take into account
   * its current or future environment.
   */
  return Math.abs(cell[0] - point[0]) + Math.abs(cell[1] - point[1]);
}
`,
};
/* eslint-enable max-len */

const EDITOR_SELECT_SOLUTION = 'EDITOR_SELECT_SOLUTION';
const EDITOR_SET_CONTENT = 'EDITOR_SET_CONTENT';
const EDITOR_SET_TITLE = 'EDITOR_SET_TITLE';
const EDITOR_SET_UNEDITED = 'EDITOR_SET_UNEDITED';
const EDITOR_START_NEW = 'EDITOR_START_NEW';

export const editorSelectSolution = actionCreator(EDITOR_SELECT_SOLUTION);
export const editorSetContent = actionCreator(EDITOR_SET_CONTENT);
export const editorSetTitle = actionCreator(EDITOR_SET_TITLE);
export const editorSetUnedited = actionCreator(EDITOR_SET_UNEDITED);
export const editorStartNew = actionCreator(EDITOR_START_NEW);

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case EDITOR_SET_CONTENT:
    return {
      ...state,
      content: payload.content,
      edited: true,
    };
  case EDITOR_SET_TITLE:
    return {
      ...state,
      edited: true,
      title: payload.title,
    };
  case EDITOR_SET_UNEDITED:
    return {
      ...state,
      edited: false,
    };
  case EDITOR_SELECT_SOLUTION:
    return {
      ...state,
      edited: false,
      content: payload.content,
      title: payload.title,
      selectedSolutionKey: payload.key,
    };
  case EDITOR_START_NEW:
    return initialState;
  default:
    return state;
  }
};
