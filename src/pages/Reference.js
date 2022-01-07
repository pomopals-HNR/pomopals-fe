import React from "react";
import { Typography as Type } from "@mui/material";
import { theme } from "../theme";
import Button from "../components/Button";

export default function Reference() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "1em",
            backgroundColor: theme.palette["yellow"].bg,
          }}
        >
          Yellow bg
        </div>
        <div
          style={{
            padding: "1em",
            backgroundColor: theme.palette["blue"].bg,
          }}
        >
          Blue bg
        </div>
        <div
          style={{
            padding: "1em",
            backgroundColor: theme.palette["purple"].bg,
          }}
        >
          Purple bg
        </div>
        <div
          style={{
            padding: "1em",
            backgroundColor: theme.palette["green"].bg,
          }}
        >
          Green bg
        </div>
      </div>

      <Type variant="display">Display text (landing page, timer)</Type>
      <Type variant="h1">Heading 1</Type>
      <Type variant="h2">Heading 2</Type>
      <Type variant="h3">Heading 3</Type>
      <Type variant="body1">Body 1</Type>
      <Type variant="body2">Body 2</Type>
      <Type variant="body2bold">Body 2 Bold</Type>
      <Type variant="body3">Body 3</Type>
      <Type variant="body3medium">Body 3 Medium</Type>
      <Type variant="body3bold">Body 3 Bold</Type>
      <Type variant="caption">caption</Type>
      <Type variant="tiny">tiny</Type>
      <br></br>

      <Button buttontheme="blue">Hello</Button>
    </div>
  );
}
