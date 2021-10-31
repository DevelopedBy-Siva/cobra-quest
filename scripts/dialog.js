import { resetSnake } from "./game.js";
import { playerInput, resetDirections } from "./playerInput.js";
import { changePause, moveBetweenScreens } from "./screens.js";

// Dialog Box
const dialogBox = document.getElementById("warning");
const dialogCover = document.getElementById("dialog-cover");

// Warining Dialog-Box Buttons
const confirmButton = document.getElementById("confirm-btn");
const cancelButton = document.getElementById("cancel-btn");

cancelButton.addEventListener("click", () => {
    window.addEventListener("keydown",playerInput);
    removeDialogBox();
    changePause(false); // Resume the game
});

// Return Home
confirmButton.addEventListener("click", returnHome);

export function returnHome() {
    moveBetweenScreens();
    resetDirections();
    resetSnake();  
}

export const handleDialogBox = () => {
    changePause(true); // Pause the game
    window.removeEventListener("keydown",playerInput)
    dialogCover.style.display = "block";
    dialogBox.style.display = "block";
    cancelButton.focus();
  
}

export const removeDialogBox = () => {
    dialogCover.style.display = "none";
    dialogBox.style.display = "none";
}
