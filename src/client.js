import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Game from './containers/Game';
import 'normalize.css/normalize.css';
import 'open-color/open-color.css';
import './client.css';

render((
  <Provider store={ configureStore() }>
    <Game />
  </Provider>
), document.getElementById('react-root'));
