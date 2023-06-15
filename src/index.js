import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import App from './components/App.jsx';

const root = createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: '#b71c1c',
    },
    secondary: {
      main: '#c62828',
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
);
