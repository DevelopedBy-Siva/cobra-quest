import { allPlayers } from "./index.js";
import {Player } from "./player_s_Object_s.js";

const PLAYER_LIST_SCROLL_SPEED = 10;

const userCover = document.getElementById("user-cover");
const userInput = document.getElementById("new-user-input");

const playerList = document.getElementsByClassName("user-list-container")[0];

export const handlePlayers = () => {
    userCover.style.display = "block";
    playerList.scrollTop = 0;
}

export const handlePlayersClose = () => {
    removeAlreadyPresent();
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
        removeAlreadyPresent();
        createPlayerElements(player)

        // Save to Local Storage
        allPlayers.savePlayersToLocalStorage();
        addPlayerButton.disabled = true;
        userInput.value = "";
    } else {
        playerAlreadyPresent();
    }
}

// Handle scroll when a new play gets added
const animatePlayer = addPlayerAnimation();

export const createPlayerElements = (player) => {

    // Create Playername element
    const nameElement = document.createElement("span");
    nameElement.className = "username";
    nameElement.appendChild(document.createTextNode(player.name));

    // Create Score element
    const scoreElement = document.createElement("span");
    scoreElement.className = "user-score";
    scoreElement.appendChild(document.createTextNode(`Highscore: ${player.score}`));

    // Create a container element to wrap Player name and score
    const detailsContainer = document.createElement("div");
    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(scoreElement);

    // Player Remove Elements
    // 1. Remove button
    const removeElement = document.createElement("button");
    removeElement.className = "remove-user";
    // 2. Remove button icon
    const removeIcon = document.createElement("i");
    removeIcon.className = "fas fa-trash-alt";
    removeElement.appendChild(removeIcon);

    // List element to wrap all the sub elements
    const listTag = document.createElement("li");

    // Append all the sub elements into the list element
    listTag.appendChild(detailsContainer);
    listTag.appendChild(removeElement);

    // Append to the Player container
    playerList.appendChild(listTag)

    // Scroll to the bottom when a new play gets added
    animatePlayer();

    // Add click event for removing players
    removeElement.addEventListener("click", () => {
        listTag.remove();
        removePlayer(player.name)
    });
}

// Remove element from the storage
function removePlayer(player) {
    allPlayers.removePlayer(player);
}

const playerAlreadyPresent = () => {

    const container = document.getElementsByClassName("add-user")[0];
    const btn = document.getElementById("add-user-btn");
    
    const element = document.createElement("span");
    element.id = "player-present-error";

    element.innerText = "Player already present";
    container.insertBefore(element, btn);
}

function removeAlreadyPresent() {
    try{
        document.getElementById("player-present-error").remove();
    }catch(ex){}
}

function addPlayerAnimation(){

    let position = 0;
    let req;

    return function animate(){

        position += PLAYER_LIST_SCROLL_SPEED;
        if(req && position >= playerList.scrollHeight) {
            playerList.scrollTop = position;
            cancelAnimationFrame(req);
            return;
        } 
        playerList.scrollTop = position;
        req = requestAnimationFrame(animate);
    }
}


