import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store';
import initialiseFirebase from './initialiseFirebase';
import Application from './components/Application';

initialiseFirebase();

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
    document.getElementById('react-root')
  );
};

render(Application);

if (module.hot) {
  module.hot.accept('./components/Application',
    () => render(Application));
}
