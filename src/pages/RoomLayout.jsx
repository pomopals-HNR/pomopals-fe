import React from "react";
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

const roomTheme = "green";
const drawerWidth = 310;

const tabs = [
  { name: "Member Tasks", icon: "check-circle" },
  { name: "Chat", icon: "message-circle" },
  { name: "Room Settings", icon: "sliders" },
  { name: "Log Out", icon: "log-out" },
];

export default function RoomLayout(props) {
  const [open, setOpen] = React.useState(false);
  const [currTab, setCurrTab] = React.useState("Member Tasks");

  const history = useHistory();

  const handleDrawerOpen = () => {
    // if (tab.name === "Log Out") {
    //   history.push("/");
    // }
    // setCurrTab(tab.name);
    setOpen(true);
  };

  // const handleIconButton = (tab) => {
  //   if (tab.name === "Log Out") {
  //     history.push("/");
  //   }
  //   setCurrTab(tab.name);
  //   console.log(tab);
  // };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar
          style={{
            flexDirection: "column",
            paddingLeft: "12px",
            paddingRight: "16px",
          }}
        >
          {tabs.map((tab) => (
            <IconButton
              key={tab.name}
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              style={{ width: "48px", height: "48px", marginBottom: "8px" }}
            >
              <FeatherIcon icon={tab.icon} style={{ color: "white" }} />
            </IconButton>
          ))}
        </Toolbar>
      </AppBar>

      <Main onClick={handleDrawerClose} open={open}>
        <Room roomTheme={roomTheme} urlName={props.match.params.name} />
      </Main>

      <Drawer
        sx={{
          width: drawerWidth,
          backgroundColor: `${roomTheme}.bgOffset`,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        {currTab === "Member Tasks" && <MemberTasksTab roomTheme={roomTheme} />}
        {currTab === "Room Settings" && <SettingsTab roomTheme={roomTheme} />}
        {currTab === "Chat" && <ChatTab roomTheme={roomTheme} />}
      </Drawer>
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
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  position: "absolute",
  right: "0",
  width: "auto",
  backgroundColor: theme.palette[roomTheme].bg,
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
    backgroundColor: theme.palette[roomTheme].bgOffset,
  },
  ...(open && {
    backgroundColor: theme.palette[roomTheme].bgOffset,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
