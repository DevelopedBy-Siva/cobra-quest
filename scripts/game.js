const SNAKE_SPEED = 1;

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
        const sinceLastRender = (time - lastRender)/1000;

        if(sinceLastRender < 1/SNAKE_SPEED) return;
        lastRender = time;

        updateSnake(playground);

    }
}

function updateSnake(container) {

    coordinates.forEach( pos => {
        const block = document.createElement("div");
        block.style.gridRowStart = pos.x;
        block.style.gridColumnStart = pos.y;
        block.classList.add("snake-body")
        container.appendChild(block);
    })
} 