import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';

import ModalProvider from '../../src';
import App from './app';

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
