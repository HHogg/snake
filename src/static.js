if (typeof window !== 'undefined') {
  require('offline-plugin/runtime').install();
}

import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase';
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
