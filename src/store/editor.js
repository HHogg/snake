import { createAction, handleActions } from '../utils/reduxActions';

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

export const editorSelectSolution = createAction(EDITOR_SELECT_SOLUTION,
  ({ content, title, key }) => ({ content, title, key }));
export const editorSetContent = createAction(EDITOR_SET_CONTENT,
  ({ content }) => ({ content }));
export const editorSetTitle = createAction(EDITOR_SET_TITLE,
  ({ title }) => ({ title }));
export const editorSetUnedited = createAction(EDITOR_SET_UNEDITED);
export const editorStartNew = createAction(EDITOR_START_NEW);

export default handleActions({
  [EDITOR_SET_CONTENT]: (_, { payload }) => ({
    content: payload.content,
    edited: true,
  }),
  [EDITOR_SET_TITLE]: (_, { payload }) => ({
    edited: true,
    title: payload.title,
  }),
  [EDITOR_SET_UNEDITED]: () => ({
    edited: false,
  }),
  [EDITOR_SELECT_SOLUTION]: (_, { payload }) => ({
    content: payload.content,
    edited: false,
    selectedSolutionKey: payload.key,
    title: payload.title,
  }),
  [EDITOR_START_NEW]: () => initialState,
}, initialState);
