import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import template from './index.ejs';
import configureStore from './store';
import initialiseFirebase from './initialiseFirebase';
import Root from './components/Root';

if (typeof document !== 'undefined') {
  initialiseFirebase();

  const store = configureStore();

  render((
    <Provider store={ store }>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('Root'));
}

export default ({ path, webpackStats: { hash } }) => {
  const store = configureStore();

  return template({
    htmlWebpackPlugin: {
      options: {
        stylesheet: `/assets/snake-heuristics.${hash}.min.css`,
        script: `/assets/snake-heuristics.${hash}.min.js`,
        html: renderToString(
          <Provider store={ store }>
            <StaticRouter location={ path }>
              <Root />
            </StaticRouter>
          </Provider>
        ),
      },
    },
  });
};
