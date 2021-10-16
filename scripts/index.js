import { handleDialogBox } from "./dialog.js";
import { handlePlayers, handlePlayersClose } from "./players.js";
import { moveBetweenScreens } from "./screens.js";

// Game Start/ Exit Buttons
const startButton = document.getElementById("start");
const exitButton = document.getElementById("exit");

// What to do when user Click "START"/ "EXIT"
startButton.addEventListener("click", moveBetweenScreens);
exitButton.addEventListener("click", handleDialogBox);

// Handle Players Buttons
const playerButton = document.getElementById("players");
const playerCloseButton = document.getElementById("add-user-close");

// WHat to do when Players/ Close Button is clicked 
playerButton.addEventListener("click", handlePlayers);
playerCloseButton.addEventListener("click", handlePlayersClose);