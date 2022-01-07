import React from "react";
import { Dialog } from "@mui/material";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import Button from "./Button";
import { Typography } from "@mui/material";
import { theme } from "../theme";
import GoogleIcon from "../assets/GoogleIcon.png";
import FeatherIcon from "feather-icons-react";

export default function Modal({ open, handleClose, roomName, setGuestName }) {
  const onGuestNameChange = (e) => setGuestName(e.target.value);

  return (
    <Dialog open={open} onClose={handleClose} sx={{ padding: "32px" }}>
      <Typography variant="h3" sx={{ padding: "32px 40px" }}>
        To join /{roomName}:
      </Typography>

      <Stack spacing={6} sx={{ padding: "0 40px 48px 40px" }}>
        <Button
          buttontheme="dark"
          sx={{
            width: "100%",
            border: `1px solid ${theme.palette.grey[400]}`,
            boxShadow: `0 4px 0 0 ${theme.palette.grey[400]}`,
            color: theme.palette.grey[500],
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={GoogleIcon}
              alt=""
              style={{ height: "18px", width: "18px" }}
            />
            <Typography variant="body2bold">Log in with Google</Typography>
          </Stack>
        </Button>
        <Stack spacing={0}>
          <Typography variant="body2bold">Or join as guest:</Typography>
          <Typography
            variant="body3"
            sx={{ color: theme.palette.text.secondary }}
          >
            Your tasks and information won’t be saved!
          </Typography>
          <Stack direction="row" alignItems="end" spacing={1}>
            <TextField
              autoFocus
              size="small"
              margin="dense"
              id="name"
              label="Your name"
              type="text"
              fullWidth
              variant="outlined"
              onChange={onGuestNameChange}
              sx={{
                height: "36px",
                backgroundColor: theme.palette.grey[300],
              }}
            />
            <IconButton
              onClick={handleClose}
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: theme.palette.primary.main,
                borderRadius: "50%",
              }}
            >
              <FeatherIcon icon="arrow-right" style={{ color: "white" }} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}
