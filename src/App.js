import "./App.css";
import Navbar from "./components/Navbar";
import * as React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Reference from "./pages/Reference";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Reference />
    </ThemeProvider>
  );
}

export default App;
