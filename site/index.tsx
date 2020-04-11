import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Root from './components/Root';

const Render = () => (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);

const rootElement = document.getElementById('Root');

if (rootElement) {
  render(<Render />, rootElement);
}
