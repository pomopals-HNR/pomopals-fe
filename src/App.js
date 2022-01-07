import "./App.css";
import Navbar from "./components/Navbar";
import * as React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div
        style={{
          padding: "3em",
          backgroundColor: theme.palette["yellow"].active,
        }}
      >
        MUI uses rem units for the font size. The browser element default font
        size is 16px, but browsers have an option to change this value, so rem
        units allow us to accommodate the user's settings, resulting in a better
        accessibility support. Users change font size settings for all kinds of
        reasons, from poor eyesight to choosing optimum settings for devices
        that can be vastly different in size and viewing distance.
      </div>
    </ThemeProvider>
  );
}

export default App;
