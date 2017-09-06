if (typeof window !== 'undefined') {
  require('offline-plugin/runtime').install();
}

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { initializeApp } from 'firebase';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import configureStore from './store';
import Application from './components/Application';
import template from './index.ejs';

if (typeof document !== 'undefined') {
  initializeApp({
    apiKey: 'AIzaSyDjffGgEF_020YYP4h5TjG8SUyzxd7EVi8',
    authDomain: 'snake-heuristics.firebaseapp.com',
    databaseURL: 'https://snake-heuristics.firebaseio.com',
    projectId: 'snake-heuristics',
    storageBucket: 'snake-heuristics.appspot.com',
    messagingSenderId: '1049330516962',
  });

  const history = createBrowserHistory();
  const store = configureStore(history);

  render((
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <Application />
      </ConnectedRouter>
    </Provider>
  ), document.getElementById('react-root'));
}

export default ({ path, webpackStats }) => {
  const history = createMemoryHistory();
  const store = configureStore(history);
  const hash = webpackStats.hash;

  return template({
    htmlWebpackPlugin: {
      options: {
        stylesheet: `/snake-heuristics/assets/snake-heuristics.${hash}.min.css`,
        script: `/snake-heuristics/assets/snake-heuristics.${hash}.min.js`,
        html: renderToString(
          <Provider store={ store }>
            <StaticRouter location={ path }>
              <Application />
            </StaticRouter>
          </Provider>
        ),
      },
    },
  });
};
