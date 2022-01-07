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

const drawerWidth = 310;

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

  const userId = localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : 0;

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      setModalOpen(true);
      setLoading(false);
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
          if (res.data[0]) {
            setLoading(false);

            const tempRoom = res.data[0];
            setRoomName(tempRoom.roomname);

            if (tempRoom.theme === null) {
              setRoomTheme(getRandomTheme());
              tempRoom.theme = roomTheme;
              updateRoom(tempRoom.worktime, tempRoom.breaktime, tempRoom.theme);
            } else {
              setRoomTheme(tempRoom.theme);
              setRoom(tempRoom);
            }
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

  const history = useHistory();

  const handleDrawerOpen = (index) => {
    setCurrTab(index);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleModalClose = () => {
    localStorage.setItem("name", guestName);
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
                      ? () => history.push("/")
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
                  setGuestName={(name) => setGuestName(name)}
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
            {currTab === 1 && <ChatTab room={room} />}
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
