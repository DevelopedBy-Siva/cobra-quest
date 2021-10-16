const userCover = document.getElementById("user-cover");
const userInput = document.getElementById("new-user-input");

export const handlePlayers = () => {
    userCover.style.display = "block";
}

export const handlePlayersClose = () => {
    userCover.style.display = "none";
    userInput.value= ""
}