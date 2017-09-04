import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase';
import configureStore from './store';
import Application from './containers/Application';

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
