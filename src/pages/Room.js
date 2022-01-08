import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { theme } from "../theme";
import Button from "../components/Button";
import PlaceholderDp from "../components/PlaceholderDp";
import OwnTasksBox from "../components/OwnTasksBox";

export default function Room(props) {
  //   const roomTheme = props.room.theme;
  const roomName = props.urlName;
  const roomId = props.room.roomid;
  // const [users, setUsers] = useState(props.room.users);
  var users = props.users;
  const socket = props.socket;

  const [roomTheme, setRoomTheme] = useState("dark");
  const [isTimerGoing, setIsTimerGoing] = useState(false);
  const [isworking, setIsworking] = useState(true);
  const [worktime, setWorktime] = useState(props.room.worktime);
  const [breaktime, setBreaktime] = useState(props.room.breaktime);
  const [[mins, secs], setTime] = useState([0, worktime]);

  //   const toggleIsWorking = (isworking) => {
  //     axios
  //       .put(`${URI}/rooms/isworking/${roomName}`, { isworking: true })
  //       .then((res) => {
  //         if (res.status === 200 && res.data[0]) {
  //           setIsworking(res.data[0].isworking);
  //           console.log("JDEIJIEJ", isworking);
  //           setIsTimerGoing(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error", error);
  //       });
  //     return false;
  //   };

  useEffect(() => {
    if (!isworking) setRoomTheme(props.room.theme);
  }, [props.room]);

  useEffect(() => {
    socket.on("startTimer", () => {
      setIsTimerGoing(!isTimerGoing);
    });
  }, []);

  useEffect(() => {
    setTime([0, worktime]);
  }, [worktime]);

  useEffect(() => {
    setTime([0, breaktime]);
  }, [breaktime]);

  useEffect(() => {
    if (isworking) {
      setTime([0, worktime]);
      setRoomTheme("dark");
    } else {
      setTime([0, breaktime]);
      setRoomTheme(props.room.theme);
    }
  }, [isworking]);

  useEffect(() => {
    setWorktime(props.room.worktime);
    setBreaktime(props.room.breaktime);
  }, [props.room]);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      //   toggleIsWorking(isworking);
      setIsworking(!isworking);
      setIsTimerGoing(false);
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  useEffect(() => {
    if (isTimerGoing) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  return (
    <>
      {roomTheme && (
        <RoomContainer roomTheme={roomTheme}>
          <LeftFloatingSide
            roomTheme={roomTheme}
            roomName={roomName}
            roomId={roomId}
            users={users}
          />
          <Stack direction="column" alignItems="center">
            <Typography
              variant="caption"
              style={{
                marginBottom: "88px",
                color: theme.palette[roomTheme].text.secondary,
              }}
            >
              {isworking ? "WORK TIME" : "BREAK TIME"}
            </Typography>
            <Typography variant="display" style={{ color: "white" }}>
              {`${mins.toString().padStart(2, "0")}:${secs
                .toString()
                .padStart(2, "0")}`}
            </Typography>

            <Button
              buttontheme={roomTheme}
              onClick={() => {
                socket.emit("startTimer", roomName, () =>
                  setIsTimerGoing(!isTimerGoing)
                );
              }}
              sx={{ width: "180px", marginTop: "60px" }}
            >
              {isTimerGoing ? "Pause" : "Start"}
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
  overflow: "hidden",
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

const RoomMember = ({ user }) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {user.profilepicture && (
        <img
          src={user.profilepicture}
          alt="profilepicture"
          style={{ width: "32px", height: "32px", borderRadius: "50%" }}
        ></img>
      )}
      {!user.profilepicture && <PlaceholderDp initial={user.name.charAt(0)} />}
      <Typography variant="body3medium">{user.name}</Typography>
    </Stack>
  );
};

const LeftFloatingSide = ({ roomTheme, roomName, roomId, users }) => {
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
        {users.map((user) => {
          return <RoomMember user={user} />;
        })}
        {/* <RoomMember name="Tiffany" />
        <RoomMember name="Lawson" />
        <RoomMember name="Lala" /> */}
      </BgOffsetBox>
      <BgOffsetBox spacing={1} roomTheme={roomTheme}>
        <Typography variant="body2bold">Tasks</Typography>
        <OwnTasksBox roomTheme={roomTheme} />
      </BgOffsetBox>
    </Stack>
  );
};
