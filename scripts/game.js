import { getSnakeDirection } from "./playerInput.js";
import { getPause } from "./screens.js";

const SNAKE_SPEED = 4;

const coordinates = [
    {
        x : 11,
        y : 11
    }
]

export function generateThePlayground(){

    let lastRender = 0;

    return function play(time) {
        requestAnimationFrame(play);
        if( !getPause() ){
            const sinceLastRender = (time - lastRender)/1000;
            if(sinceLastRender < 1/SNAKE_SPEED) 
                return;
            
            lastRender = time;
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
    container.innerHTML = '';
    coordinates.forEach( pos => {
        const block = document.createElement("div");
        block.style.gridRowStart = pos.y;
        block.style.gridColumnStart = pos.x;
        block.classList.add("snake-body")
        container.appendChild(block);
    })
}