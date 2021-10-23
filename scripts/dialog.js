import { playerInput } from "./playerInput.js";
import { moveBetweenScreens } from "./screens.js";

// Dialog Box
const dialogBox = document.getElementById("warning");
const dialogCover = document.getElementById("dialog-cover");

// Warining Dialog-Box Buttons
const confirmButton = document.getElementById("confirm-btn");
const cancelButton = document.getElementById("cancel-btn");

export const handleDialogBox = () => {
    window.removeEventListener("keydown",playerInput)
    dialogCover.style.display = "block";
    dialogBox.style.display = "block";
    cancelButton.focus();
    cancelButton.addEventListener("click", () => {
        window.addEventListener("keydown",playerInput);
        removeDialogBox();
    });
    confirmButton.addEventListener("click", moveBetweenScreens);
}

export const removeDialogBox = () => {
    dialogCover.style.display = "none";
    dialogBox.style.display = "none";
}
