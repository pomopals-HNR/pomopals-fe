import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { TextField } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import { URI } from "../global";
import { IconButton } from "@mui/material";
import { theme } from "../theme";
import { Button } from "@mui/material";
import { styled } from "@mui/material";

// const roomTheme = localStorage.getItem("currTheme");
const userId = localStorage.getItem("userid")
  ? localStorage.getItem("userid")
  : 0;

export default function OwnTasksBox({ roomTheme }) {
  const [tasks, setTasks] = useState();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskName, setTaskName] = useState("");

  const onTaskFieldChange = (e) => setTaskName(e.target.value);

  useEffect(() => {
    getUserTasks();
  }, []);

  const getUserTasks = () => {
    axios
      .get(`${URI}/tasks/${userId}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const toggleTask = (taskid, index) => {
    axios
      .put(`${URI}/tasks/${taskid}`)
      .then((res) => {
        if (res.status === 200 && res.data[0]) {
          let tempTasks = [...tasks];
          tempTasks[index] = res.data[0];
          setTasks(tempTasks);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  const addTask = (taskname) => {
    axios
      .post(`${URI}/tasks`, {
        userid: userId,
        taskname: taskname,
      })
      .then((res) => {
        if (res.data) {
          getUserTasks();
          setTaskName("");
          setIsAddingTask(false);
        }
      });
  };

  return (
    <div>
      {tasks && (
        <div>
          {tasks.map((task, index) => (
            <OwnTask
              roomTheme={roomTheme}
              key={task.taskid}
              toggleTask={toggleTask}
              done={task.state}
              task={task.taskname}
              taskId={task.taskid}
              index={index}
            />
          ))}
        </div>
      )}
      {!isAddingTask && (
        <Button
          variant="text"
          sx={{
            textTransform: "none",
            color: theme.palette[roomTheme].text.secondary,
          }}
          onClick={() => setIsAddingTask(true)}
          startIcon={<FeatherIcon icon="plus" size="18" />}
        >
          Click to add task...
        </Button>
      )}
      {isAddingTask && (
        <Stack alignItems="end">
          <Stack spacing={1} direction="row" alignItems="center">
            <TextField
              id="outlined-size-small"
              label={<Typography variant="body3">New task name</Typography>}
              size="small"
              type="text"
              color="dark"
              margin="normal"
              onChange={onTaskFieldChange}
              sx={{
                backgroundColor: `${roomTheme}.bg`,
                fontSize: "12px",
                color: roomTheme === "dark" ? "#fff" : "#353535",
              }}
            />
            <IconButton onClick={() => setIsAddingTask(false)}>
              <FeatherIcon icon="x" />
            </IconButton>
          </Stack>
          <Button
            variant="text"
            onClick={() => addTask(taskName)}
            sx={{
              backgroundColor: "white",
              color: theme.palette[roomTheme].active,
              boxShadow: "none",
              textTransform: "none",
            }}
          >
            Add Task
          </Button>
        </Stack>
      )}
    </div>
  );
}

const OwnTask = (props) => {
  return (
    <Stack direction="row" spacing={1}>
      {props.roomTheme && (
        <div style={{ width: "24px" }}>
          <StyledCheckIcon
            icon="check-circle"
            size="24"
            roomTheme={props.roomTheme}
            done={props.done}
            onClick={() => props.toggleTask(props.taskId, props.index)}
          />
        </div>
      )}
      {!props.done && <Typography variant="body2">{props.task}</Typography>}
      {props.done && (
        <strike>
          <Typography variant="body2">{props.task}</Typography>
        </strike>
      )}
    </Stack>
  );
};

const StyledCheckIcon = styled(FeatherIcon, {
  shouldForwardProp: (prop) => prop !== "done" || prop !== "roomTheme",
})(({ done, roomTheme }) => ({
  color: done ? "white" : theme.palette[roomTheme].text.secondary,
  "&:hover": {
    transition: "200ms ease-in-out",
    opacity: "0.4",
    cursor: "pointer",
  },
}));
