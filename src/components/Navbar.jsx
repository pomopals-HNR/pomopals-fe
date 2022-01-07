import { URI } from "../global";
import GoogleLogin from "react-google-login";

import { useState, useEffect } from "react";

export default function Navbar(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 24px",
        backgroundColor: "lightgray",
      }}
    >
      <h3>pomopals</h3>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
