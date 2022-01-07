import React from "react";
import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import PlaceholderDp from "./PlaceholderDp";
import { theme } from "../theme";

var roomTheme;

export default function ChatTab(props) {
  roomTheme = props.room.theme;

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        padding: "24px",
        backgroundColor: theme.palette[roomTheme].bgOffset,
        height: "100%",
        color: roomTheme === "dark" ? "white" : "#353535",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h3">Chat</Typography>
        <Divider />

        <Stack spacing={2}>
          <ChatMessage
            isUserMsg={true}
            username="lalalawson"
            message="im gna go sleep first"
          />
          <ChatMessage
            isUserMsg={true}
            username="yonggggler"
            message="byebye lawson"
          />
          <ChatMessage
            isUserMsg={true}
            username="tiffany"
            message="Look at me I’m a beautiful butterfly Fluttering in the moonlight 😀"
          />
          <ChatMessage isUserMsg={false} message="Lawson left the room." />
        </Stack>
      </Stack>
      Input field here
    </Stack>
  );
}

const ChatMessage = ({ isUserMsg, username, message, date }) => {
  return (
    <div>
      {isUserMsg && (
        <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
          {/* <div style={{ width: "32px" }}>
            <PlaceholderDp initial={username} />
          </div> */}
          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="body2bold">{username}</Typography>
              <Typography
                variant="tiny"
                sx={{ color: theme.palette[roomTheme].text.secondary }}
              >
                today at 9:42pm
              </Typography>
            </Stack>
            <Typography variant="body2">{message}</Typography>
          </Stack>
        </Stack>
      )}

      {!isUserMsg && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: "100%", color: theme.palette[roomTheme].text.secondary }}
        >
          <Typography variant="body2italic">{message}</Typography>
          <Typography variant="tiny">today at 9:42pm</Typography>
        </Stack>
      )}
    </div>
  );
};
