import axios from "axios";
import React, { useEffect, useState } from "react";
import { URI } from "../global";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Room from "./Room";
import FeatherIcon from "feather-icons-react";
import SettingsTab from "../components/SettingsTab";
import MemberTasksTab from "../components/MemberTasksTab";
import { useHistory } from "react-router-dom";
import ChatTab from "../components/ChatTab";
import { theme } from "../theme";
import { Typography } from "@mui/material";
import { getRandomTheme } from "../global";
import Modal from "../components/Modal";
import { io } from "socket.io-client";

const drawerWidth = 310;
const socket = io.connect("http://localhost:5000");

const tabs = [
  { name: "Member Tasks", icon: "check-circle" },
  { name: "Chat", icon: "message-circle" },
  { name: "Room Settings", icon: "sliders" },
  { name: "Log Out", icon: "log-out" },
];

export default function RoomLayout(props) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currTab, setCurrTab] = React.useState(1);
  const [room, setRoom] = useState();
  const [roomName, setRoomName] = useState(props.match.params.name);
  const [roomTheme, setRoomTheme] = useState("");
  const [guestName, setGuestName] = useState("");
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);

  const userId = localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : 0;

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      setModalOpen(true);
      setLoading(false);
    } else {
      setUserName(localStorage.getItem("name"));
    }
  }, []);

  useEffect(() => {
    loadRoomData();
  }, [roomName, roomTheme]);

  useEffect(() => {
    if (room) {
      setRoomTheme(room.theme);
    }
  }, [room]);

  useEffect(() => {
    if (userName) {
      socket.emit(
        "joinRoom",
        {
          username: userName,
          roomName: roomName,
        },
        () => {
          newSystemMessage(userName, "has joined the room");
        }
      );
      socket.on("promptJoin", (message) => {
        newSystemMessage(message.username, "has joined the room");
      });
      socket.on("receiveMessage", (message) => {
        newUserMessage(message.username, message.content);
      });
    }
  }, [userName]);

  const updateRoom = (worktime, breaktime, theme) => {
    axios
      .put(`${URI}/rooms/${roomName}`, {
        worktime: worktime,
        breaktime: breaktime,
        theme: theme,
      })
      .then((res) => {
        setRoom(res.data[0]);
      });
  };

  const loadRoomData = () => {
    if (props.location.pathname) {
      axios
        .post(`${URI}/rooms/${userId}/${roomName}`)
        .then((res) => {
          if (res.data) {
            const tempRoom = res.data;
            setLoading(false);
            setRoomName(tempRoom.roomname);
            setUsers(res.data.users);

            if (tempRoom.theme === null) {
              setRoomTheme(getRandomTheme());
              tempRoom.theme = roomTheme;
              updateRoom(tempRoom.worktime, tempRoom.breaktime, tempRoom.theme);
            } else {
              setRoomTheme(tempRoom.theme);
              setRoom(tempRoom);
            }
            localStorage.setItem("currTheme", roomTheme);
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

  const createGuest = (username) => {
    if (username) {
      axios
        .post(`${URI}/guest-login/${username}`)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            localStorage.setItem("userid", res.data);
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

  const history = useHistory();

  const newSystemMessage = (username, message) => {
    const m = {
      isUserMsg: false,
      username: username,
      message: message,
    };
    setMessages((oldMsg) => [...oldMsg, m]);
  };

  const newUserMessage = (username, message) => {
    const m = {
      isUserMsg: true,
      username: username,
      message: message,
    };
    setMessages((oldMsg) => [...oldMsg, m]);
  };

  const sendMessage = (content) => {
    socket.emit(
      "sendMessage",
      {
        username: userName,
        roomName: roomName,
        content: content,
      },
      () => {
        newUserMessage(userName, content);
      }
    );
  };

  const handleDrawerOpen = (index) => {
    setCurrTab(index);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleModalClose = () => {
    createGuest(guestName);
    localStorage.setItem("name", guestName);
    setUserName(guestName);
    setModalOpen(false);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      {!loading && room && roomTheme && (
        <div>
          <AppBar
            position="fixed"
            drawerOpen={drawerOpen}
            roomtheme={roomTheme}
          >
            <Toolbar
              style={{
                flexDirection: "column",
                paddingLeft: "12px",
                paddingRight: "16px",
              }}
            >
              {tabs.map((tab, index) => (
                <IconButton
                  sx={{
                    ...(drawerOpen &&
                      currTab === index && {
                        backgroundColor: theme.palette[roomTheme].active,
                      }),
                  }}
                  key={tab.name}
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={
                    tab.name === "Log Out"
                      ? () => {
                          socket.disconnect();
                          history.push("/");
                          socket.connect();
                        }
                      : () => handleDrawerOpen(index)
                  }
                  style={{ width: "48px", height: "48px", marginBottom: "8px" }}
                >
                  <FeatherIcon icon={tab.icon} style={{ color: "white" }} />
                </IconButton>
              ))}
            </Toolbar>
          </AppBar>
          <Main onClick={handleDrawerClose} drawerOpen={drawerOpen}>
            {room && roomTheme && (
              <>
                <Room urlName={props.match.params.name} room={room} />
                <Modal
                  open={modalOpen}
                  handleClose={handleModalClose}
                  roomName={roomName}
                  setGuestName={(name) => {
                    setGuestName(name);
                  }}
                />
              </>
            )}
          </Main>
          <Drawer
            sx={{
              width: drawerWidth,
              backgroundColor: theme.palette[roomTheme].bgOffset,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
              },
            }}
            variant="persistent"
            anchor="right"
            open={drawerOpen}
          >
            {currTab === 0 && <MemberTasksTab room={room} />}
            {currTab === 1 && (
              <ChatTab room={room} messages={messages} onSend={sendMessage} />
            )}
            {currTab === 2 && (
              <SettingsTab setRoom={(room) => setRoom(room)} room={room} />
            )}
          </Drawer>
        </div>
      )}
      {loading && (
        <div
          style={{
            width: "100vw",
            height: "98vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: "white" }}>
            Loading...
          </Typography>
        </div>
      )}
    </div>
  );
}

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(drawerOpen && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "drawerOpen" || prop !== "roomtheme",
})(({ theme, drawerOpen, roomtheme }) => ({
  position: "absolute",
  right: "0",
  width: "auto",
  backgroundColor: theme.palette[roomtheme].bg,
  boxShadow: "none",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  transition: "background-color 200ms",
  "&:hover": {
    backgroundColor: theme.palette[roomtheme].bgOffset,
  },
  ...(drawerOpen && {
    backgroundColor: theme.palette[roomtheme].bgOffset,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
