import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../theme";
import Button from "../components/Button";
import PlaceholderDp from "../components/PlaceholderDp";
import FeatherIcon from "feather-icons-react";

export default function Room(props) {
  const roomTheme = props.room.theme;
  const roomName = props.urlName;
  const roomId = props.room.roomid;
  const worktime = props.room.worktime;

  return (
    <>
      {roomTheme && (
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
              {worktime}:00
            </Typography>
            <Button currTheme={roomTheme} style={{ width: "180px" }}>
              Start
            </Button>
          </Stack>
        </RoomContainer>
      )}
    </>
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
  color: roomTheme === "dark" ? "white" : "#353535",
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
