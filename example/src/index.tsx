import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';

import ModalProvider from '../../src';
import App from './app';

const theme = createTheme();
const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
