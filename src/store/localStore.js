import merge from 'lodash.merge';
import { LOCAL_STORAGE_REDUX_KEY } from '../../functions/config';

const storeList = ['editor'];

export default function localStore() {
  return (next) => (reducer, initialState, enhancer) => {
    let persistedState;
    let finalInitialState;

    try {
      persistedState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_REDUX_KEY));
      finalInitialState = merge(initialState, persistedState);
    } catch (e) {
      //
    }

    const store = next(reducer, finalInitialState, enhancer);

    store.subscribe(() => {
      const state = store.getState();
      const stateToStore = Object.keys(state)
        .filter((key) => storeList.includes(key))
        .reduce((acc, key) => Object.assign(acc, { [key]: state[key] }), {});

      try {
        window.localStorage.setItem(LOCAL_STORAGE_REDUX_KEY, JSON.stringify(stateToStore));
      } catch (e) {
        //
      }
    });

    return store;
  };
}
