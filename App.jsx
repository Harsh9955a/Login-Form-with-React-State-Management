import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import LoginForm from './components/LoginForm';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C9A84C',       // antique gold
      light: '#E2C97E',
      dark: '#9C7A28',
      contrastText: '#0E0E14',
    },
    secondary: {
      main: '#6C8EAD',
    },
    background: {
      default: '#0A0A12',
      paper: '#12121E',
    },
    text: {
      primary: '#EDE8DC',
      secondary: '#9A9585',
    },
    error: {
      main: '#E05C6A',
    },
    success: {
      main: '#4CAF7D',
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"DM Sans", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 2,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(201,168,76,0.2)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(201,168,76,0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#C9A84C',
            borderWidth: '1px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#9A9585',
          '&.Mui-focused': { color: '#C9A84C' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          padding: '14px 0',
          fontSize: '0.8rem',
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginForm />
    </ThemeProvider>
  );
}
