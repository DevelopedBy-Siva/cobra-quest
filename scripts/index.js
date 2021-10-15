import { moveBetweenScreens } from "./screens.js";

// Game Start/ Exit Buttons
const startButton = document.getElementById("start");
const exitButton = document.getElementById("exit");

// What to do when user Click "START"/ "EXIT"
startButton.addEventListener("click", moveBetweenScreens);
exitButton.addEventListener("click", moveBetweenScreens);