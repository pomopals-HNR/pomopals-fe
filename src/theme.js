import { createTheme } from "@mui/material/styles";
import CerebriSansBook from "./assets/fonts/CerebriSans-Book.ttf";
import CerebriSansMedium from "./assets/fonts/CerebriSans-Medium.ttf";
import CerebriSansBold from "./assets/fonts/CerebriSans-Bold.ttf";
import CerebriSansItalic from "./assets/fonts/CerebriSans-Italic.ttf";
import CerebriSansMediumItalic from "./assets/fonts/CerebriSans-MediumItalic.ttf";

const fontStyleOverrides = `@font-face {
          font-family: 'CerebriSans';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('CerebriSans'), local('CerebriSans-Book'), url(${CerebriSansBook}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'CerebriSans';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('CerebriSans'), local('CerebriSans-Medium'), url(${CerebriSansMedium}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'CerebriSans';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('CerebriSans'), local('CerebriSans-Bold'), url(${CerebriSansBold}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'CerebriSans';
          font-style: italic;
          font-display: swap;
          font-weight: 400;
          src: local('CerebriSans'), local('CerebriSans-Italic'), url(${CerebriSansItalic}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }

        @font-face {
          font-family: 'CerebriSans';
          font-style: italic;
          font-display: swap;
          font-weight: 500;
          src: local('CerebriSans'), local('CerebriSans-MediumItalic'), url(${CerebriSansMediumItalic}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }`;

const palette = {
  primary: {
    main: "#F17165",
    light: "#DFD3D2",
  },
  grey: {
    300: "#F4F5F6",
    400: "#C7C7C7",
    500: "#808080",
    600: "#5E5E5E",
    700: "#545454",
    800: "#474747",
    900: "#353535",
  },
  dark: {
    bg: "#353535",
    bgOffset: "#2B2B2B",
    text: {
      primary: "#fff",
      secondary: "#949494",
    },
    active: "#1A1A1A",
  },
  purple: {
    bg: "#D7CCF5",
    bgOffset: "#CABCF0",
    text: {
      secondary: "#8C84A4",
    },
    active: "#B9A4EE",
  },
  yellow: {
    bg: "#F2CC7B",
    bgOffset: "#F0C66A",
    text: {
      secondary: "#AE8329",
    },
    active: "#D0A549",
  },
  blue: {
    bg: "#BAD5DD",
    bgOffset: "#B0CFD8",
    text: {
      secondary: "#627C84",
    },
    active: "#87B3C0",
  },
  green: {
    bg: "#A2D8C0",
    bgOffset: "#93D2B6",
    text: {
      secondary: "#628475",
    },
    active: "#7AB39A",
  },
  text: {
    primary: "#353535",
  },
};

const typography = {
  fontFamily: "CerebriSans",

  display: {
    fontSize: 48,
    fontWeight: 800,
    lineHeight: "60px",
    "@media (min-width:900px)": {
      fontSize: "60px",
      lineHeight: "1.3",
    },
  },
  h1: {
    fontSize: 36,
    fontWeight: 800,
  },
  h2: {
    fontSize: 28,
    fontWeight: 800,
  },
  h3: {
    fontSize: 24,
    fontWeight: 800,
  },
  body1: {
    fontSize: 20,
  },
  body2: {
    fontSize: 16,
  },
  body2italic: {
    fontSize: 16,
    fontStyle: "italic",
  },
  body2bold: {
    fontSize: 16,
    fontWeight: 600,
  },
  body3: {
    fontSize: 14,
  },
  body3medium: {
    fontSize: 14,
    fontWeight: 500,
  },
  body3bold: {
    fontSize: 14,
    fontWeight: 600,
  },
  caption: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  tiny: {
    fontSize: 10,
    // fontWeight: 600,
  },
};

export const theme = createTheme({
  palette: palette,
  typography: typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: fontStyleOverrides,
    },
  },
});
