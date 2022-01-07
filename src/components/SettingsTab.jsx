import React, { useState } from "react";
import { theme } from "../theme";
import { URI } from "../global";
import { Typography, Stack, Divider, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import IOSSwitch from "./IOSSwitch";
import Button from "./Button";
import { themeColors } from "../global";
import axios from "axios";

export default function SettingsTab(props) {
  const [worktime, setWorktime] = useState(props.room.worktime);
  const [breaktime, setBreaktime] = useState(props.room.breaktime);
  const [roomTheme, setRoomTheme] = useState(props.room.theme);
  const [isPrivateRoom, setIsPrivateRoom] = useState(
    props.room.password ? true : false
  );

  const onBreaktimeChange = (e) => setBreaktime(e.target.value);
  const onWorktimeChange = (e) => setWorktime(e.target.value);

  const handleSubmit = () => {
    axios
      .put(`${URI}/rooms/${props.room.roomname}`, {
        worktime: worktime,
        breaktime: breaktime,
        theme: roomTheme,
      })
      .then((res) => {
        console.log("SUCCESSFULLY UPDATED", res.data[0]);
        props.setRoom(res.data[0]);
      });
  };

  const handleThemeSelect = (event) => {
    setRoomTheme(event.target.value);
  };

  const controlProps = (item) => ({
    checked: roomTheme === item,
    onChange: handleThemeSelect,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const handleSwitchChange = (event) => {
    setIsPrivateRoom(event.target.checked);
    console.log("is private room?", isPrivateRoom);
  };

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
            value={worktime}
            variant="outlined"
            onChange={onWorktimeChange}
            sx={{ backgroundColor: `${roomTheme}.bg` }}
          />
          <TextField
            id="filled-basic"
            label="Break"
            size="small"
            value={breaktime}
            variant="outlined"
            onChange={onBreaktimeChange}
            sx={{ backgroundColor: `${roomTheme}.bg` }}
          />
        </Stack>
        <Divider />
        <Typography variant="body2bold">Room theme</Typography>
        <div style={{ margin: "0" }}>
          {themeColors.map((color) => (
            <Radio
              key={color.name}
              {...controlProps(color.name)}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 32,
                },
                color: color.theme.active,
                "&.Mui-checked": {
                  color: color.theme.active,
                },
              }}
            />
          ))}
        </div>
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
          <IOSSwitch checked={isPrivateRoom} onChange={handleSwitchChange} />
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

      <Button currTheme={roomTheme} onClick={handleSubmit}>
        Save Changes
      </Button>
    </Stack>
  );
}
