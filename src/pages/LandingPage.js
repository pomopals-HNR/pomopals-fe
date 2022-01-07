import React from "react";
import styled from "@emotion/styled";
import { Typography as Text } from "@mui/material";
import { theme } from "../theme";
import heroTomato from "../assets/heroTomato.png";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}

const HeroSection = () => {
  return (
    <HeroContainer>
      <div className="heroTitle">
        <Text variant="display" style={{ marginBottom: "42px" }}>
          A productivity{" "}
          <span style={{ color: theme.palette.primary.main }}>pomodoro</span>{" "}
          timer for remote teams.
        </Text>
        <Text variant="caption">create your shareable link</Text>
        <div
          style={{
            height: "50px",
            backgroundColor: "white",
            width: "600px",
            borderRadius: "999px",
            marginTop: "16px",
          }}
        ></div>
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
  );
};

const HeroContainer = styled.section`
  margin: 0 7.5vw;
  color: #fff;
  min-height: calc(100vh - 89px);
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
