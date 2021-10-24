import { handleDialogBox } from "./dialog.js";
import { addPlayer, handleInputChange, handlePlayers, handlePlayersClose, loadPlayers } from "./players.js";
import { AllPlayers } from "./player_s_Object_s.js";
import { moveBetweenScreens } from "./screens.js";

const container = document.getElementById("loading-screen");
const spinner = document.getElementById("loading-screen-spinner");
const playerWrapper = document.getElementsByClassName("player-wrapper")[0];
const gameTitle = document.querySelector(".game-title h4");
const gameImage = document.querySelector(".game-title img");

// Game Start/ Exit Buttons
const startButton = document.getElementById("start");
const exitButton = document.getElementById("exit");

// Handle Loading screen
window.addEventListener("load" ,() => {
    
    spinner.classList.add("loading-screen-animation-close");
    container.classList.add("loading-screen-animation");
    playerWrapper.classList.add("display-player-wrapper");
    gameTitle.classList.add("game-title-anim");
    gameImage.classList.add("game-logo-anim");
    startButton.classList.add("game-start-btn-anim");

    setTimeout(() => {
        container.remove();
    },1000)
});

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