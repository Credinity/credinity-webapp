import {
  Primary,
  Secondary,
  White,
  VenetianRed,
} from "@/public/constants/color.constant";
import { createTheme } from "@mui/material";

export const theme = createTheme({
  //K. Jane Style : 24 Jun 2022
  typography: {
    fontFamily: "Kanit",
    fontWeightLight: 100,
    fontWeightRegular: 200,
    fontWeightMedium: 300,
    fontWeightBold: 400,
    button: {
      fontSize: "26px",
      fontWeight: "300",
      lineHeight: 1.2,
    },
    h1: {
      fontSize: "28px",
      lineHeight: 1.3,
    },
    h2: {
      fontSize: "24px",
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "20px",
      lineHeight: 1.5,
    },
    h4: {
      fontSize: "18px",
      lineHeight: 1.6,
    },
    h5: {
      fontSize: "16px",
      lineHeight: 1.6,
    },
    body1: {
      fontSize: "16px",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "14px",
      lineHeight: 1.6,
    },
    caption: {
      fontSize: "14px",
      lineHeight: 1.6,
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
