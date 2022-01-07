import { URI } from "../global";
import logo from "../assets/darkModeLogo.svg";
import { theme } from "../theme";
import styled from "@emotion/styled";
import Button from "./Button";
import GoogleLogin from "react-google-login";
import { useState, useEffect } from "react";

export default function Navbar(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const StyledNavbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.7vw 2vw 0 2vw;
    background-color: ${theme.palette.grey[900]};

    .links a {
      color: #fff;
      margin-left: 40px;
    }
    .links Button {
      margin-left: 40px;
      font-size: 18px;
      font-family: "CerebriSans";
      font-weight: 400;
    }
  `;

  const handleLogin = async (googleData) => {
    const res = await fetch(`${URI}/google-login`, {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    props.onUpdate(data);
  };

  const handleFailure = (googleData) => {
    alert("Login failed.");
  };

  return (
    <StyledNavbar>
      <a href="/" style={{ width: "12vw" }}>
        <img alt="logo" src={logo} />
      </a>

      <div className="links">
        <a href="/">about</a>
        <a href="/">how it works</a>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => <Button currTheme="dark">log in</Button>}
        />
      </div>
      {/* <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      /> */}
    </StyledNavbar>
  );
}
