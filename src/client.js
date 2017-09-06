import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { initializeApp } from 'firebase';
import configureStore from './store';
import Application from './components/Application';

initializeApp({
  apiKey: 'AIzaSyDjffGgEF_020YYP4h5TjG8SUyzxd7EVi8',
  authDomain: 'snake-heuristics.firebaseapp.com',
  databaseURL: 'https://snake-heuristics.firebaseio.com',
  projectId: 'snake-heuristics',
  storageBucket: 'snake-heuristics.appspot.com',
  messagingSenderId: '1049330516962',
});

const history = createHistory();
const store = configureStore(history);

const render = (AppComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <ConnectedRouter history={ history }>
          <AppComponent />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('react-root'));
};

render(Application);

if (module.hot) {
  module.hot.accept('./components/Application',
    () => render(Application));
}
