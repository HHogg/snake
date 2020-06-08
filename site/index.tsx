import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root';

const rootElement = document.getElementById('Root');

if (rootElement) {
  render((
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  ), rootElement);
}
