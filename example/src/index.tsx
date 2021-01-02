import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ModalProvider from '../../src';
import App from './App';

ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById('root')
);
