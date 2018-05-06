import { compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import localStore from './localStore';
import rootReducer from './root';

export default function configureStore() {
  const finalCompose = process.env.NODE_ENV === 'production'
    ? compose
    : composeWithDevTools;

  return createStore(
    rootReducer,
    finalCompose(
      localStore(),
    ),
  );
}
