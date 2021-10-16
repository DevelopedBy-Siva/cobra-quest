import {Player } from "./player_s_Object_s.js";

const userCover = document.getElementById("user-cover");
const userInput = document.getElementById("new-user-input");

export const handlePlayers = () => {
    userCover.style.display = "block";
}

export const handlePlayersClose = () => {
    userCover.style.display = "none";
    userInput.value= ""
    addPlayerButton.disabled = true;
}

// Add new Player

const addPlayerButton = document.getElementById("add-user-btn");

export const handleInputChange = (e) => {
    const value = e.target.value;
    if(value && value.length > 0){
        addPlayerButton.disabled = false;
        return;
    }
    addPlayerButton.disabled = true;
}

export const addPlayer = (allPlayers) => {
    
    // Add new Player
    const player = new Player(userInput.value.toLowerCase(), 0);

    // Push the new Player to the list of existing players
    const added = allPlayers.addPlayer(player);

    if(added){

        createPlayerElements(player)

        // Save to Local Storage
        allPlayers.savePlayersToLocalStorage();
        addPlayerButton.disabled = true;
        userInput.value = "";
    }
}

const playerList = document.getElementsByClassName("user-list-container")[0];

export const createPlayerElements = (player) => {
    const listTag = document.createElement("li");

    const nameElement = document.createElement("span");
    nameElement.className = "username";

    nameElement.appendChild(document.createTextNode(player.name));

    const scoreElement = document.createElement("span");
    scoreElement.className = "user-score";

    scoreElement.appendChild(document.createTextNode(`Highscore: ${player.score}`));

    const detailsContainer = document.createElement("div");
    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(scoreElement);

    // Player Remove Elements
    const removeElement = document.createElement("button");
    removeElement.className = "remove-user";

    const removeIcon = document.createElement("i");
    removeIcon.className = "fas fa-trash-alt";

    removeElement.appendChild(removeIcon);

    listTag.appendChild(detailsContainer);
    listTag.appendChild(removeElement);

    playerList.appendChild(listTag)
}

