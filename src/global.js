import { theme } from "./theme";

export const URI = "http://localhost:5000";

export const themeColors = [
  {
    name: "purple",
    theme: theme.palette.purple,
  },
  {
    name: "yellow",
    theme: theme.palette.yellow,
  },
  {
    name: "green",
    theme: theme.palette.green,
  },
  {
    name: "blue",
    theme: theme.palette.blue,
  },
  {
    name: "dark",
    theme: theme.palette.dark,
  },
];

export function getRandomTheme() {
  const randomIndex = Math.floor(Math.random() * themeColors.length + 1);
  return themeColors[randomIndex - 1].name;
}
