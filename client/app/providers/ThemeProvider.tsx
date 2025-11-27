"use client";

import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: '"Proxima Nova", "Red Hat Display", system-ui, sans-serif',
    allVariants: {
      color: "#222222",
    },
  },
  palette: {
    text: {
      primary: "#222222",
    },
    primary: {
      main: "#0F172A",
    },
    background: {
      default: "#F9FAFB",
    },
  },
});

export default function AppThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
