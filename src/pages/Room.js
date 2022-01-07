import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../theme";
import Button from "../components/Button";
import PlaceholderDp from "../components/PlaceholderDp";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { URI } from "../global";

export default function Room(props) {
  const [roomName, setRoomName] = useState(props.urlName);
  const [roomId, setRoomId] = useState(0);
  const userId = localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : 0;
  const roomTheme = props.roomTheme;

  useEffect(() => {
    loadRoomData();
  }, [roomName]);

  const loadRoomData = () => {
    if (props.urlName) {
      axios
        .post(`${URI}/rooms/${userId}/${roomName}`)
        .then((res) => {
          if (res.data[0]) {
            setRoomName(res.data[0].roomname);
            setRoomId(res.data[0].roomid);
          } else {
            alert("room does not exist!");
          }
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
          console.log(error.config);
        });
    }
  };
  return (
    <RoomContainer roomTheme={roomTheme}>
      <LeftFloatingSide
        roomTheme={roomTheme}
        roomName={roomName}
        roomId={roomId}
      />

      <Stack direction="column" alignItems="center">
        <Typography
          variant="caption"
          style={{
            marginBottom: "88px",
            color: theme.palette[roomTheme].text.secondary,
          }}
        >
          BREAK TIME
        </Typography>
        <Typography
          variant="display"
          style={{ color: "white", marginBottom: "60px" }}
        >
          30:00
        </Typography>
        <Button currTheme={roomTheme} style={{ width: "180px" }}>
          Start
        </Button>
      </Stack>
    </RoomContainer>
  );
}

const RoomContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "roomTheme",
})(({ theme, roomTheme }) => ({
  backgroundColor: theme.palette[roomTheme].bg,
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const BgOffsetBox = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "roomTheme",
})(({ theme, roomTheme }) => ({
  backgroundColor: theme.palette[roomTheme].bgOffset,
  padding: "12px",
  width: "230px",
  borderRadius: "8px",
  color: roomTheme == "dark" ? "white" : "#353535",
}));

const RoomMember = ({ name }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {/* TODO: Add condition to check if dp exists */}
      <PlaceholderDp initial={name.charAt(0)} />
      <Typography variant="body3medium">{name}</Typography>
    </Stack>
  );
};

const LeftFloatingSide = ({ roomTheme, roomName, roomId }) => {
  return (
    <Stack
      spacing={2}
      style={{ position: "absolute", top: "40px", left: "40px" }}
    >
      <Typography
        variant="h2"
        style={{
          marginBottom: "18px",
          color: "#fff",
        }}
      >
        /{roomName}
      </Typography>
      <Typography variant="tiny">{roomId}</Typography>
      <BgOffsetBox spacing={1} roomTheme={roomTheme}>
        <RoomMember name="Tiffany" />
        <RoomMember name="Lawson" />
        <RoomMember name="Lala" />
      </BgOffsetBox>
      <BgOffsetBox spacing={1} roomTheme={roomTheme}>
        <Typography variant="body2bold">Tasks</Typography>
        <OwnTask done={true} task="I am a task" />
        <OwnTask done={true} task="I too am another task to be completed." />
      </BgOffsetBox>
    </Stack>
  );
};

const OwnTask = ({ done, task }) => {
  return (
    <Stack direction="row" spacing={1}>
      <div style={{ width: "18px" }}>
        <FeatherIcon icon="check-circle" size="18" />
      </div>
      <Typography variant="body2">{task}</Typography>
    </Stack>
  );
};
