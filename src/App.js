import "./App.css";
import * as React from "react";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LandingPage from "./pages/LandingPage";
import RoomLayout from "./pages/RoomLayout";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { URI } from "./global";
import { BrowserRouter, Route } from "react-router-dom";

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
          localStorage.setItem("userid", res.data[0].userid);
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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Navbar currentUser={currentUser} onUpdate={setUserId} /> */}
        <Route
          exact
          path="/"
          render={() => {
            return (
              <LandingPage
                currentUser={currentUser}
                theme={theme}
                onUpdate={setUserId}
              />
            );
          }}
        ></Route>
        <Route
          exact
          path="/room/:name"
          render={(props) => {
            return <RoomLayout {...props} />;
          }}
        ></Route>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
