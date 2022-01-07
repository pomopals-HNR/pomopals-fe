import React from "react";
import { theme } from "../theme";
import { Typography, Stack, Divider, TextField } from "@mui/material";
import IOSSwitch from "./IOSSwitch";
import Button from "./Button";

export default function SettingsTab({ roomTheme }) {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{
        padding: "24px",
        backgroundColor: `${roomTheme}.bgOffset`,
        height: "100%",
        color: roomTheme === "dark" ? "white" : "#353535",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h3">Room Settings</Typography>
        <Divider />
        <Typography variant="body2bold">Time(minutes)</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            id="filled-basic"
            label="Work"
            size="small"
            defaultValue="25"
            variant="outlined"
            sx={{ backgroundColor: `${roomTheme}.bg` }}
          />
          <TextField
            id="filled-basic"
            label="Break"
            size="small"
            defaultValue="5"
            variant="outlined"
            sx={{ backgroundColor: `${roomTheme}.bg` }}
          />
        </Stack>
        <Divider />
        <Typography variant="body2bold">Room theme</Typography>
        <Stack direction="row" spacing={1}>
          <ColorCircles />
        </Stack>
        <Divider />
        <Stack direction="row" spacing={2}>
          <Stack>
            <Typography variant="body2bold">Private Room</Typography>
            <Typography
              variant="body3"
              style={{ color: theme.palette[roomTheme].text.secondary }}
            >
              Secure room with a passcode
            </Typography>
          </Stack>
          <IOSSwitch />
        </Stack>
        <Divider />
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2bold">Passcode</Typography>
          <TextField
            id="filled-hidden-label-small"
            size="small"
            defaultValue="5"
            variant="outlined"
            sx={{ backgroundColor: `${roomTheme}.bg`, width: "50%" }}
          />
        </Stack>
      </Stack>

      <Button currTheme={roomTheme}>Save Changes</Button>
    </Stack>
  );
}

const ColorCircles = () => {
  const colors = [
    theme.palette.purple.bg,
    theme.palette.yellow.bg,
    theme.palette.green.bg,
    theme.palette.blue.bg,
    theme.palette.dark.bg,
  ];
  return (
    <>
      {colors.map((color) => (
        <div
          key={color}
          style={{
            height: "32px",
            width: "32px",
            borderRadius: "50%",
            backgroundColor: color,
          }}
        ></div>
      ))}
    </>
  );
};
