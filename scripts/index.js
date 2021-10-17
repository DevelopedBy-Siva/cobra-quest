import { handleDialogBox } from "./dialog.js";
import { addPlayer, handleInputChange, handlePlayers, handlePlayersClose, loadPlayers } from "./players.js";
import { AllPlayers } from "./player_s_Object_s.js";
import { moveBetweenScreens } from "./screens.js";

// Game Start/ Exit Buttons
const startButton = document.getElementById("start");
const exitButton = document.getElementById("exit");

// What to do when user Click "START"/ "EXIT"
startButton.addEventListener("click", moveBetweenScreens);
exitButton.addEventListener("click", handleDialogBox);

const allPlayers = new AllPlayers();

// Load players from Storage if available
loadPlayers();

// Handle Players Buttons
const playerButton = document.getElementById("players");
const playerCloseButton = document.getElementById("add-user-close");

// WHat to do when Players/ Close Button is clicked 
playerButton.addEventListener("click", handlePlayers);
playerCloseButton.addEventListener("click", handlePlayersClose);

// Add New Player
const addPlayerBtn = document.getElementById("add-user-btn");
const playerInput = document.getElementById("new-user-input");

addPlayerBtn.addEventListener("click", () => addPlayer(allPlayers));
playerInput.addEventListener("input", handleInputChange);

export {
    allPlayers
}