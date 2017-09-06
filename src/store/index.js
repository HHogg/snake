import { compose, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import localStore from './localStore';
import rootReducer from './root';

export default function configureStore(history) {
  const finalCompose = process.env.NODE_ENV === 'production'
    ? compose
    : composeWithDevTools;

  return createStore(
    rootReducer,
    finalCompose(
      localStore(),
      applyMiddleware(createRouterMiddleware(history))
    ),
  );
}
