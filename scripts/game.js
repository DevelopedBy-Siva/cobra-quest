import { getSnakeDirection } from "./playerInput.js";
import { getPause } from "./screens.js";

const playground = document.getElementById("playground");

const SNAKE_SPEED = 5;
const snakePosition = 11;

let coordinates = [
    {
        x : snakePosition,
        y : snakePosition
    }
]

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
            drawSnake(playground);
        }
    }
}

function updateSnake() {
    const snakeDirection = getSnakeDirection();
    for(let index = coordinates.length - 2; index >= 0; index--) {
        coordinates[index + 1] = {...coordinates[index]}
    }

    coordinates[0].x += snakeDirection.x;
    coordinates[0].y += snakeDirection.y; 
}

function drawSnake(container) {
    
    // Remove snake body from DOM
    removeSnakeBody();

    coordinates.forEach( pos => {
        const block = document.createElement("div");
        block.style.gridRowStart = pos.y;
        block.style.gridColumnStart = pos.x;
        block.classList.add("snake-body")
        container.appendChild(block);
    })
}

// Remove snake body from DOM
function removeSnakeBody() {
    document.querySelectorAll(".snake-body").forEach( element => {
        element.remove();
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

// Create Snake Food
function updateFood() {
    // Create container element for food
    const element = document.createElement("div");
    element.classList.add("snake-food");

    // Create food image
    const foodImg = document.createElement("img");
    foodImg.alt = "snake-food";
    foodImg.src = "../Snake-Game/images/apple.webp";

    element.appendChild(foodImg);

    element.style.gridRowStart = 4;
    element.style.gridColumnStart = 4;

    playground.appendChild(element);
}