'use client';

import { createTheme } from '@mui/material/styles';

// Color system based on the provided blue palette
const lightPalette = {
  primary: {
    main: '#2C7DA0', // Primary blue
    light: '#61A5C2',
    dark: '#2C7DA0',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#468FAF', // Secondary blue
    light: '#89C2D9',
    dark: '#2C7DA0',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#DC3545',
    light: '#E57373',
    dark: '#B00020',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#198754',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#F57F17',
    contrastText: '#000000',
  },
  info: {
    main: '#89C2D9',
    light: '#A9DDE5',
    dark: '#61A5C2',
    contrastText: '#000000',
  },
  background: {
    default: '#F8F9FA', 
    paper: '#FFFFFF',
  },
  text: {
    primary: '#012A4A',
    secondary: '#013A63',
    disabled: '#A3A9B5',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

// Dark mode palette
const darkPalette = {
  primary: {
    main: '#61A5C2', // Primary darker blue - lightened for better contrast
    light: '#89C2D9',
    dark: '#2A6F97',
    contrastText: '#012A4A',
  },
  secondary: {
    main: '#89C2D9', // Secondary darker blue - lightened for better contrast
    light: '#A9DDE5',
    dark: '#61A5C2',
    contrastText: '#012A4A',
  },
  error: {
    main: '#F44336',
    light: '#E57373',
    dark: '#D32F2F',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#4CAF50',
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FFC107',
    light: '#FFD54F',
    dark: '#FFA000',
    contrastText: '#000000',
  },
  info: {
    main: '#2A6F97',
    light: '#014F86',
    dark: '#013A63',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#012A4A',
    paper: '#01497C', // Slightly lighter than darkest blue for better contrast
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A9DDE5',
    disabled: '#89C2D9', // Lightened for better visibility
  },
  divider: 'rgba(255, 255, 255, 0.2)',
};

// Animation and transition settings
// Store our custom easing functions separately for component use
const customEasing = {
  emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  standardDecelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  standardAccelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
};

// Define transitions object that adheres to MUI's TransitionsOptions interface
const transitions = {
  easing: {
    easeInOut: customEasing.standard,
    easeOut: customEasing.standardDecelerate,
    easeIn: customEasing.standardAccelerate,
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
};

// Create the light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    ...lightPalette,
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.625rem',
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 16, // More rounded corners for Material 3
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.05), 0px 1px 1px 0px rgba(0,0,0,0.03), 0px 1px 3px 0px rgba(0,0,0,0.02)',
    '0px 3px 3px -2px rgba(0,0,0,0.05), 0px 2px 6px 0px rgba(0,0,0,0.03), 0px 1px 8px 0px rgba(0,0,0,0.02)',
    '0px 3px 4px -2px rgba(0,0,0,0.05), 0px 3px 8px 0px rgba(0,0,0,0.03), 0px 1px 12px 0px rgba(0,0,0,0.02)',
    '0px 4px 5px -2px rgba(0,0,0,0.05), 0px 4px 10px 0px rgba(0,0,0,0.03), 0px 1px 16px 0px rgba(0,0,0,0.02)',
    '0px 5px 6px -3px rgba(0,0,0,0.05), 0px 6px 12px 1px rgba(0,0,0,0.03), 0px 2px 20px 0px rgba(0,0,0,0.02)',
    '0px 6px 7px -4px rgba(0,0,0,0.05), 0px 8px 14px 1px rgba(0,0,0,0.03), 0px 3px 24px 0px rgba(0,0,0,0.02)',
    '0px 7px 9px -4px rgba(0,0,0,0.05), 0px 10px 17px 2px rgba(0,0,0,0.03), 0px 4px 28px 0px rgba(0,0,0,0.02)',
    '0px 8px 10px -5px rgba(0,0,0,0.05), 0px 12px 22px 2px rgba(0,0,0,0.03), 0px 5px 32px 0px rgba(0,0,0,0.02)',
    '0px 9px 12px -6px rgba(0,0,0,0.05), 0px 14px 26px 2px rgba(0,0,0,0.03), 0px 5px 38px 3px rgba(0,0,0,0.02)',
    '0px 10px 14px -6px rgba(0,0,0,0.05), 0px 16px 30px 3px rgba(0,0,0,0.03), 0px 6px 42px 5px rgba(0,0,0,0.02)',
    '0px 11px 15px -7px rgba(0,0,0,0.05), 0px 18px 34px 3px rgba(0,0,0,0.03), 0px 6px 48px 6px rgba(0,0,0,0.02)',
    '0px 12px 17px -8px rgba(0,0,0,0.05), 0px 20px 38px 4px rgba(0,0,0,0.03), 0px 7px 52px 7px rgba(0,0,0,0.02)',
    '0px 13px 20px -8px rgba(0,0,0,0.05), 0px 22px 42px 4px rgba(0,0,0,0.03), 0px 8px 58px 8px rgba(0,0,0,0.02)',
    '0px 14px 21px -9px rgba(0,0,0,0.05), 0px 24px 46px 5px rgba(0,0,0,0.03), 0px 9px 64px 9px rgba(0,0,0,0.02)',
    '0px 16px 24px -10px rgba(0,0,0,0.05), 0px 26px 50px 5px rgba(0,0,0,0.03), 0px 10px 70px 10px rgba(0,0,0,0.02)',
    '0px 17px 26px -11px rgba(0,0,0,0.05), 0px 28px 54px 6px rgba(0,0,0,0.03), 0px 11px 76px 11px rgba(0,0,0,0.02)',
    '0px 18px 28px -12px rgba(0,0,0,0.05), 0px 30px 58px 6px rgba(0,0,0,0.03), 0px 12px 82px 12px rgba(0,0,0,0.02)',
    '0px 19px 30px -13px rgba(0,0,0,0.05), 0px 32px 62px 7px rgba(0,0,0,0.03), 0px 13px 88px 13px rgba(0,0,0,0.02)',
    '0px 20px 32px -14px rgba(0,0,0,0.05), 0px 34px 66px 7px rgba(0,0,0,0.03), 0px 14px 94px 14px rgba(0,0,0,0.02)',
    '0px 21px 33px -14px rgba(0,0,0,0.05), 0px 36px 70px 8px rgba(0,0,0,0.03), 0px 15px 100px 15px rgba(0,0,0,0.02)',
    '0px 22px 36px -15px rgba(0,0,0,0.05), 0px 38px 74px 8px rgba(0,0,0,0.03), 0px 16px 108px 16px rgba(0,0,0,0.02)',
    '0px 23px 38px -16px rgba(0,0,0,0.05), 0px 40px 78px 9px rgba(0,0,0,0.03), 0px 17px 114px 17px rgba(0,0,0,0.02)',
    '0px 24px 40px -17px rgba(0,0,0,0.05), 0px 42px 82px 9px rgba(0,0,0,0.03), 0px 18px 120px 18px rgba(0,0,0,0.02)',
    '0px 25px 42px -18px rgba(0,0,0,0.05), 0px 45px 85px 10px rgba(0,0,0,0.03), 0px 20px 124px 19px rgba(0,0,0,0.02)',
  ],
  transitions,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          transition: `background-color ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          padding: '10px 24px',
          transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: lightPalette.primary.dark,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: lightPalette.secondary.dark,
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        outlinedSecondary: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          overflow: 'hidden',
          transition: `all ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: `box-shadow ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        },
        elevation4: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
            '&.Mui-focused': {
              transform: 'scale(1.01)',
            },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            transform: 'translateX(4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 16px 16px 0',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          transition: `all ${transitions.duration.standard}ms ${transitions.easing.easeInOut}`,
          '&:hover': {
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  },
});

// Create the dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...darkPalette,
  },
  typography: lightTheme.typography,
  shape: lightTheme.shape,
  transitions,
  components: {
    ...lightTheme.components,
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
          transition: `box-shadow ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)',
        },
        elevation4: {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          padding: '10px 24px',
          transition: `all ${transitions.duration.short}ms ${transitions.easing.easeInOut}`,
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: darkPalette.primary.light,
          },
        },
        containedSecondary: {
          '&:hover': {
            backgroundColor: darkPalette.secondary.light,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: `all ${transitions.duration.shorter}ms ${transitions.easing.easeInOut}`,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            transform: 'translateX(4px)',
          },
        },
      },
    },
  },
});

// Default theme
const theme = lightTheme;
export default theme;
