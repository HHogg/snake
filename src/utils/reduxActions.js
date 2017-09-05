import {
  combineActions as raCombineActions,
  createAction as raCreateActions,
  handleActions as raHandleActions,
} from 'redux-actions';

export const combineActions = raCombineActions;
export const createAction = raCreateActions;
export const handleActions = (actions, defaultState) => raHandleActions(Object
  .entries(actions)
  .reduce((actions, [ action, nextState ]) => Object.assign({}, actions, {
    [action]: (state, action) => Object.assign({}, state, nextState(state, action)),
  }), {}), defaultState);
