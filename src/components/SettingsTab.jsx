import React from "react";
import { Typography, Stack, Divider, Box, TextField } from "@mui/material";

export default function SettingsTab({ roomTheme }) {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: "24px",
        backgroundColor: `${roomTheme}.bgOffset`,
        height: "100%",
      }}
    >
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
      <Typography variant="body2bold">Private room?</Typography>
    </Stack>
  );
}

const ColorCircles = () => {
  const colors = ["purple.bg", "yellow.bg", "green.bg"];
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
