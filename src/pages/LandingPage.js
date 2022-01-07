import React, { useState } from "react";
import styled from "@emotion/styled";
import { Typography as Text } from "@mui/material";
import { theme } from "../theme";
import heroTomato from "../assets/heroTomato.png";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage(props) {
  const [roomName, setRoomName] = useState("");
  const userId = props.currentUser ? props.currentUser.userid : 0;
  const history = useHistory();

  return (
    <div>
      <Navbar currentUser={props.currentUser} onUpdate={props.onUpdate} />
      {props.currentUser && (
        <>
          <div
            style={{
              padding: "3em",
              backgroundColor: props.theme.palette["purple"].active,
            }}
          >
            Hello, {props.currentUser.name}
          </div>
        </>
      )}
      <HeroContainer>
        <div className="heroTitle">
          <Text variant="display" style={{ marginBottom: "42px" }}>
            A productivity{" "}
            <span style={{ color: theme.palette.primary.main }}>pomodoro</span>{" "}
            timer for remote teams.
          </Text>
          <Text variant="caption">create your shareable link</Text>
          {/* <div
            style={{
              height: "50px",
              backgroundColor: "white",
              width: "600px",
              borderRadius: "999px",
              marginTop: "16px",
            }}
          ></div> */}
          <div>
            <input
              onChange={(e) => {
                setRoomName(e.target.value);
                console.log(userId);
              }}
            />
            <button
              onClick={() => {
                history.push(`room/${roomName}`);
              }}
            >
              Join Room
            </button>
          </div>
        </div>
        <div className="heroImage">
          <img src={heroTomato} />
        </div>
        <Text
          variant="tiny"
          style={{ position: "absolute", bottom: "10px", left: "10px" }}
        >
          Created by lala n tiftif for HacknRoll'22
        </Text>
      </HeroContainer>
    </div>
  );
}

const HeroContainer = styled.section`
  margin: 0 7.5vw;
  color: #fff;
  min-height: calc(100vh - 0px);

  .heroTitle {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80vh;
    z-index: 10;
    position: relative;
  }

  .heroImage {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 9;
    width: 470px;
  }
  .heroImage img {
    width: 100%;
    z-index: 9;
  }

  @media (max-width: 600px) {
    .heroImage img {
      width: 50%;
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
`;
