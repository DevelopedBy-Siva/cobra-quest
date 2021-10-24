import { getSnakeDirection } from "./playerInput.js";
import { getPause } from "./screens.js";

const SNAKE_SPEED = 200;

const coordinates = [
    {
        x : 11,
        y : 11
    }
]

export function generateThePlayground(){

    let run = true;
    updateSnake();
    drawSnake(playground);

    return function play() {
        if(run && !getPause()){
            run = false;
            setTimeout(() => {
                run = true;
                updateSnake();
                drawSnake(playground);
                requestAnimationFrame(play);
            }, SNAKE_SPEED)
        }
        else requestAnimationFrame(play);
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