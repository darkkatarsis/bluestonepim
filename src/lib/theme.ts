'use client';

import { createTheme } from '@mui/material/styles';

// Design tokens - Bluestone PIM brand colors
const tokens = {
    colors: {
        primary: '#1E3A8A',
        primaryDark: '#1E40AF',
        primaryLight: 'rgba(30, 58, 138, 0.15)',
        grey100: '#2A2A2A',
        grey200: '#7F7F7F',
        grey300: '#E4E4E4',
        grey400: '#EEEEEE',
        error: '#FF4E4E',
        white: '#FFFFFF',
        black: '#000000',
        disabledBg: 'rgba(0, 0, 0, 0.2)',
    },
    borderRadius: 4,
    shadows: {
        focused: '0px 0px 0px 4px rgba(30, 58, 138, 0.25)',
        dialog: '0px 4px 10px 2px rgba(0, 0, 0, 0.1)',
    },
};

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: tokens.colors.primary,
            dark: tokens.colors.primaryDark,
            light: tokens.colors.primaryLight,
            contrastText: tokens.colors.white,
        },
        grey: {
            100: tokens.colors.grey100,
            200: tokens.colors.grey200,
            300: tokens.colors.grey300,
            400: tokens.colors.grey400,
        },
        error: {
            main: tokens.colors.error,
        },
        background: {
            default: tokens.colors.white,
            paper: tokens.colors.white,
        },
        text: {
            primary: tokens.colors.grey100,
            secondary: tokens.colors.grey200,
        },
    },
    shape: {
        borderRadius: tokens.borderRadius,
    },
    components: {
        // Buttons - disable uppercase, add focus shadow
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    '&:focus-visible': {
                        boxShadow: tokens.shadows.focused,
                    },
                },
            },
        },
        // Inputs - custom focus shadow
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        boxShadow: tokens.shadows.focused,
                    },
                },
            },
        },
        // Chips - primary light background
        MuiChip: {
            styleOverrides: {
                root: {
                    backgroundColor: tokens.colors.primaryLight,
                },
            },
        },
        // Paper & Dialog - custom shadow
        MuiPaper: {
            styleOverrides: {
                elevation1: {
                    boxShadow: tokens.shadows.dialog,
                },
            },
        },
    },
});
