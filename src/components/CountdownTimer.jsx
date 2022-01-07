import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

export default function CountdownTimer({ minutes, isTimerGoing }) {
  const [[mins, secs], setTime] = useState([0, minutes]);

  const tick = () => {
    if (mins === 0 && secs === 0) {
      reset();
      //   toggleIsWorking();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  const reset = () => setTime([0, parseInt(minutes)]);

  const handleTimerFinish = () => {
    setTime([0, minutes]);
    // toggleIsWorking();
  };

  useEffect(() => {
    if (isTimerGoing) {
      const timerId = setInterval(() => tick(), 1000);
      return () => clearInterval(timerId);
    }
  });

  return (
    <div>
      <Typography variant="display" style={{ color: "white" }}>
        {`${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`}
      </Typography>
    </div>
  );
}
