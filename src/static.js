if (typeof window !== 'undefined') {
  require('offline-plugin/runtime').install();
}

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import createMemoryHistory from 'history/createMemoryHistory';
import template from './index.ejs';
import configureStore from './store';
import initialiseFirebase from './initialiseFirebase';
import Application from './components/Application';

if (typeof document !== 'undefined') {
  initialiseFirebase();

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
        stylesheet: `/assets/snake-heuristics.${hash}.min.css`,
        script: `/assets/snake-heuristics.${hash}.min.js`,
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
