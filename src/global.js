import { theme } from "./theme";

export const URI = "http://localhost:5000";

export const themeColors = [
  {
    name: "purple",
    theme: theme.palette.purple.bg,
  },
  {
    name: "yellow",
    theme: theme.palette.yellow.bg,
  },
  {
    name: "green",
    theme: theme.palette.green.bg,
  },
  {
    name: "blue",
    theme: theme.palette.blue.bg,
  },
  {
    name: "dark",
    theme: theme.palette.dark.bg,
  },
];

export function getRandomTheme() {
  const randomIndex = Math.floor(Math.random() * themeColors.length + 1);
  return themeColors[randomIndex - 1].name;
}
