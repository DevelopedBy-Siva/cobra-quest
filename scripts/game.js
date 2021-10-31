import { returnHome } from "./dialog.js";
import { getSnakeDirection, playerInput } from "./playerInput.js";
import { changePause, getPause } from "./screens.js";

const playground = document.getElementById("playground");

const GRID_SIZE = 21;

const SNAKE_SPEED = 5;
const snakePosition = 11;

let coordinates = [
    {
        x : snakePosition,
        y : snakePosition
    }
]

let foodPosition = {
    x : 4,
    y: 4
}

let EXPANSION_RATE = 1;
let newSegment = 0;

let playAnimate;

export function generateThePlayground(){

    let lastRender = 0;

    return function play(time) {
        playAnimate = requestAnimationFrame(play);
        if( !getPause() ){
            const sinceLastRender = (time - lastRender)/1000;
            if(sinceLastRender < 1/SNAKE_SPEED) 
                return;

            lastRender = time;
            updateFood();
            updateSnake();
            checkDeath();
            drawSnake(playground);
            drawFood();

        }
    }
}

function updateSnake() {
    addSegment(); 
    const snakeDirection = getSnakeDirection();
    for(let index = coordinates.length - 2; index >= 0; index--) {
        coordinates[index + 1] = {...coordinates[index]}
    }

    coordinates[0].x += snakeDirection.x;
    coordinates[0].y += snakeDirection.y; 
}

function drawSnake(container) {
    playground.innerHTML = "";
    coordinates.forEach( pos => {
        const block = document.createElement("div");
        block.style.gridRowStart = pos.y;
        block.style.gridColumnStart = pos.x;
        block.classList.add("snake-body")
        container.appendChild(block);
    })
}

export function resetSnake(){
    coordinates = [
        {
            x : snakePosition,
            y : snakePosition
        }
    ]
    if(playAnimate)
        cancelAnimationFrame(playAnimate);
}

function updateFood() {

    if(checkFoodAndSnakePositions(foodPosition)){
        expandSnake(EXPANSION_RATE);
        foodPosition =  generateFoodPosition();
    }
}

function checkFoodAndSnakePositions(position) {
    return coordinates.some( dir => {
        if(dir.x === position.x && dir.y === position.y){
            return true;
        }
    })
}

function expandSnake(rate) {
    newSegment += rate;
}

function addSegment() {
    for(let i = 0; i < newSegment; i++) {
        coordinates.push({...coordinates[coordinates.length-1]});
    }
    newSegment = 0;
}

function generateFoodPosition() {
    let randomPosition;
    while(randomPosition == null || checkFoodAndSnakePositions(randomPosition)){
        randomPosition = getRandomPosition();
    }
    return randomPosition;
}

function getRandomPosition() {
    return {
        x : Math.floor(Math.random() * GRID_SIZE) + 1,
        y : Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

// Create Snake Food
function drawFood() {
    // Create container element for food
    const element = document.createElement("div");
    element.classList.add("snake-food");

    // Create food image
    const foodImg = document.createElement("img");
    foodImg.alt = "snake-food";
    foodImg.src = "../Snake-Game/images/apple.webp";

    element.appendChild(foodImg);

    element.style.gridRowStart = foodPosition.y;
    element.style.gridColumnStart = foodPosition.x;

    playground.appendChild(element);
}

function checkDeath() {
    const {x, y} = coordinates[0];
    let dead = false;
    if(x < 1 || x > GRID_SIZE || y < 1 || y > GRID_SIZE) {
        changePause(true);
        dead = true;
    }
    if(dead){
        window.removeEventListener("keydown", playerInput)
        createGameOverElement();
    }
}

function createGameOverElement() {

    const container = document.createElement("div");
    container.classList.add("game-over");
    container.id = "game-over";

    const content = document.createElement("div");
    content.className = "game-over-content";

    const title = document.createElement("h2");
    title.innerHTML = "GAME<br>OVER";
    content.appendChild(title);

    const subHead = document.createElement("h4");
    subHead.innerText = "SCORE";
    content.appendChild(subHead);

    const score = document.createElement("h3");
    score.innerText = "18900";
    content.appendChild(score);

    const button = document.createElement("button");
    button.innerText = "OK";
    content.appendChild(button);

    container.appendChild(content);

    const gameScreen = document.getElementsByClassName("game-screen")[0];
    gameScreen.appendChild(container);

    button.addEventListener("click", () => {
        returnHome(); // Back to Home Screen
        container.remove(); // Remove Game Over container
    });
}