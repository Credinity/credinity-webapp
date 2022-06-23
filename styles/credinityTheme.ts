import {
  Primary,
  Secondary,
  White,
  VenetianRed,
} from "@/public/constants/color.constant";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Kanit",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "48px",
      lineHeight: 1,
    },
    h2: {
      fontSize: "38px",
      lineHeight: 1,
    },
    h3: {
      fontSize: "24px",
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "16px",
      lineHeight: 1.7,
    },
    h5: {
      fontSize: "14px",
      lineHeight: 1.7,
    },
    body1: {
      fontSize: "14px",
      lineHeight: 1.7,
    },
    body2: {
      fontSize: "12px",
      lineHeight: 1.7,
    },
    caption: {
      fontSize: "14px",
      lineHeight: 1.7,
    },
  },
  spacing: 8,
  palette: {
    background: {
      default: White,
    },
    primary: {
      main: Primary,
      contrastText: White,
    },
    secondary: {
      main: Secondary,
    },
    error: {
      main: VenetianRed,
    },
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          "&:hover": {
            color: Primary,
          },
        }),
      },
    },
  },
});
