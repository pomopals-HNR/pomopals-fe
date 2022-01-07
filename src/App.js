import "./App.css";
import Navbar from "./components/Navbar";
import * as React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
