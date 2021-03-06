import React from "react";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

const CustomButtonRoot = styled(ButtonUnstyled, {
  shouldForwardProp: (prop) => prop !== "buttontheme",
})(({ theme, buttontheme }) => ({
  fontWeight: 600,
  fontSize: 16,
  backgroundColor: "#fff",
  fontFamily: "CerebriSans",
  color: theme.palette[buttontheme].active,
  boxShadow: `0 4px 0 0 ${theme.palette[buttontheme].active}`,
  padding: "12px 24px",
  borderRadius: 5,
  transition: "all 150ms ease",
  cursor: "pointer",
  border: "none",

  "&:hover": {
    backgroundColor: theme.palette.grey["300"],
    boxShadow: "none",
  },
  "&:active": {
    backgroundColor: theme.palette.grey["300"],
  },
}));

export default function Button(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}
