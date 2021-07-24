import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StyledEngineProvider, createTheme } from '@material-ui/core/styles';

import ModalProvider from '../../src';
import App from './App';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme();

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);
