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
import { getRandomTheme } from "../global";

const drawerWidth = 310;

const tabs = [
  { name: "Member Tasks", icon: "check-circle" },
  { name: "Chat", icon: "message-circle" },
  { name: "Room Settings", icon: "sliders" },
  { name: "Log Out", icon: "log-out" },
];

export default function RoomLayout(props) {
  const [open, setOpen] = React.useState(false);
  const [currTab, setCurrTab] = React.useState(1);
  const [room, setRoom] = useState();

  const [roomName, setRoomName] = useState(props.match.params.name);
  const [roomId, setRoomId] = useState(0);
  const [worktime, setWorktime] = useState();
  const [breakTime, setBreakTime] = useState();
  const [roomTheme, setRoomTheme] = useState("");

  const userId = localStorage.getItem("userid")
    ? localStorage.getItem("userid")
    : 0;

  useEffect(() => {
    loadRoomData();
  }, [roomName, roomTheme]);

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
            const tempRoom = res.data[0];
            setRoomName(tempRoom.roomname);
            setRoomId(tempRoom.roomid);

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
    } else {
      console.log("No url name");
    }
  };

  const history = useHistory();

  const handleDrawerOpen = (index) => {
    setCurrTab(index);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {roomTheme && (
        <div>
          <AppBar position="fixed" open={open} roomtheme={roomTheme}>
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
                    ...(open &&
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
          <Main onClick={handleDrawerClose} open={open}>
            {room && roomTheme && (
              <Room urlName={props.match.params.name} room={room} />
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
            open={open}
          >
            {currTab === 0 && <MemberTasksTab roomTheme={roomTheme} />}
            {currTab === 1 && <ChatTab roomTheme={roomTheme} />}
            {currTab === 2 && <SettingsTab roomTheme={roomTheme} />}
          </Drawer>
        </div>
      )}
    </>
  );
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" || prop !== "roomtheme",
})(({ theme, open, roomtheme }) => ({
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
  ...(open && {
    backgroundColor: theme.palette[roomtheme].bgOffset,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
