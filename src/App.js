import "./App.css";
import Navbar from "./components/Navbar";
import * as React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { URI } from "./global";

function App() {
  const [userId, setUserId] = useState(localStorage.userId);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (userId) {
      axios
        .get(`${URI}/users/${userId}`)
        .then((res) => {
          setCurrentUser(res.data[0]);
          localStorage.setItem("name", res.data[0].name);
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          } else if (error.request) {
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          //setPending(false);
          console.log(error.config);
        });
    } else {
      setCurrentUser(null);
    }
  }, [userId]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar currentUser={currentUser} onUpdate={setUserId} />
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
      {currentUser && (
        <div
          style={{
            padding: "3em",
            backgroundColor: theme.palette["purple"].active,
          }}
        >
          Hello, {currentUser.name}
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
