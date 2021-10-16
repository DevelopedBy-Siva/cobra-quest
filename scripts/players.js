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
        // Save to Local Storage
        allPlayers.savePlayersToLocalStorage();
        addPlayerButton.disabled = true;
        userInput.value="";
    }

}

