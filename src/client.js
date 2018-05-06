import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import initialiseFirebase from './initialiseFirebase';
import Root from './components/Root';

initialiseFirebase();

const store = configureStore(history);

const render = (AppComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <BrowserRouter>
          <AppComponent />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('Root')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./components/Root',
    () => render(Root));
}
