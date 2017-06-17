if (typeof window !== 'undefined') {
  require('offline-plugin/runtime').install();
}

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from './store';
import Application from './containers/Application';
import template from './index.ejs';
import 'normalize.css/normalize.css';
import 'open-color/open-color.css';
import './client.css';

if (typeof document !== 'undefined') {
  render((
    <Provider store={ configureStore() }>
      <Application />
    </Provider>
  ), document.getElementById('react-root'));
}

export default (locals) => {
  const hash = locals.webpackStats.hash;

  return template({
    htmlWebpackPlugin: {
      options: {
        stylesheet: `/snake-heuristics/assets/snake-heuristics.${hash}.min.css`,
        script: `/snake-heuristics/assets/snake-heuristics.${hash}.min.js`,
        html: renderToString(
          <Provider store={ configureStore() }>
            <Application />
          </Provider>
        ),
      },
    },
  });
};
