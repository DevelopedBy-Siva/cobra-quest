import { allPlayers } from "./index.js";
import {Player } from "./player_s_Object_s.js";
import { removePlayerWarningFromDOM } from "./screens.js";

const PLAYER_LIST_SCROLL_SPEED = 10;
let LOAD_DATA = true;

const userCover = document.getElementById("user-cover");
const userInput = document.getElementById("new-user-input");

const playerList = document.getElementsByClassName("user-list-container")[0];

let scrollPosition = 0;

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

        // Remove No User Message if present
        try{
            playerList.removeChild(playerList.getElementsByClassName("no-user")[0]);
        }catch(ex){}

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

    if(!LOAD_DATA){
        
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

        // Set Active Player
        listTag.addEventListener("click", () => {
            removePlayerWarningFromDOM();
            allPlayers.setAsActivePlayer(player.name);
            const tags = document.querySelectorAll(".add-user .user-list li");
            tags.forEach( i => {
                const name = i.getElementsByClassName("username")[0].innerHTML;
                const active = allPlayers.getActivePlayer();
                if(active && (name === active.name))
                    i.classList.add("user-selected");
                else
                    i.classList.remove("user-selected");
            });
            createCurrentPlayer();
        })
    }
}

// Remove element from the storage
function removePlayer(player) {
    allPlayers.removePlayer(player);

    // Show message when no players are found
    if(allPlayers.getAllPlayers().length === 0)
        noPlayerMessage();

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

const scrollDelay = delayNewScrollPosition();

// Update the scroll position on Scroll
playerList.addEventListener("scroll", (e)=>{
    scrollDelay(e);
});

// Delay setting the new Scroll Position
function delayNewScrollPosition(){
    let clear;
    return function(...args){
        if(clear)
            clearTimeout(clear);
        setTimeout(()=>{
            scrollPosition = args[0].target.scrollTop;
            console.log(scrollPosition)
        }, 1000)
    }
}

function addPlayerAnimation(){
    let req;
    return function animate(){

        scrollPosition += PLAYER_LIST_SCROLL_SPEED;
        if(req && scrollPosition >= playerList.scrollHeight) {
            playerList.scrollTop = scrollPosition;
            cancelAnimationFrame(req);
            return;
        } 
        playerList.scrollTop = scrollPosition;
        req = requestAnimationFrame(animate);
    }
}

export function loadPlayers(){

    const addPlayerBtn = document.getElementById("add-user-btn");

    try{
        createLoadingElement();
        
        // Get Players from LocalStorage (if available)
        allPlayers.loadPlayersFromStorage();

        // Show current player on the screen
        createCurrentPlayer();

        LOAD_DATA = false;
        addPlayerBtn.innerHTML= "Add";
    
        // Create a Loading spinner
        playerList.removeChild(playerList.getElementsByClassName("loading-spinner-wrap")[0]);

        const players = [...allPlayers.getAllPlayers()];
    
        // No user message when no users are found from storage
        if(players.length === 0) noPlayerMessage();

        // Create DOM elements using Loaded data
        if(players.length > 0) {
            players.forEach( i => {
                createPlayerElements(i);
            });
        }

        // Set Active Players from Storage
        const tags = document.querySelectorAll(".add-user .user-list li");
        const active = allPlayers.getActivePlayer();
        tags.forEach( i => {
            const name = i.getElementsByClassName("username")[0].innerHTML;
            if(active && (name === active.name))
                i.classList.add("user-selected");
            else
                i.classList.remove("user-selected");
        });
        
    } catch(ex){
        LOAD_DATA = false;
        addPlayerBtn.innerHTML= "Add";
    }
}

// Loading Element
function createLoadingElement() { 
    const element = document.createElement("h5");
    element.className = "loading-spinner-wrap";

    const spinner = document.createElement("i");
    spinner.className = "loading-spinner-content fas fa-spinner";

    element.appendChild(spinner);
    playerList.appendChild(element);
}

// Shows "No Players" message
function noPlayerMessage(){
    const element = document.createElement("h4");
    element.className = "no-user";
    element.innerText = "No players found";

    playerList.appendChild(element);
}

// Create Current Player elements
function createCurrentPlayer() {

    try{

        // Check the DOM has the current player details
        currentPlayerExists();

        const getPlayer = allPlayers.getActivePlayer();

        // Current Player element
        const playerElement = document.createElement("span");
        playerElement.innerText = getPlayer.name;
        playerElement.className = "current-user-name"

        document.getElementsByClassName("player-sub-wrapper")[0].appendChild(playerElement);

        // Current Player Score
        const scoreElement = document.createElement("span");
        scoreElement.className = "current-user-score";
        scoreElement.innerHTML = `<span id="current-user-score-title">Score: </span> ${getPlayer.score}`;
        
        document.getElementsByClassName("player-wrapper")[0].appendChild(scoreElement);

    }catch(ex){}
}

function currentPlayerExists() {
    const userElement = document.getElementsByClassName("current-user-name")[0];
    const scoreElement = document.getElementsByClassName("current-user-score")[0];

    try{
        if(userElement || scoreElement) {
            userElement.remove();
            scoreElement.remove();
        }
    }catch(ex){}
}

function setLoadData(data) {
    LOAD_DATA = data;
}

export {
    setLoadData
}