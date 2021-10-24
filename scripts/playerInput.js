let direction = {
    x : 0,
    y : 0
}

let lastDirection = {
    x : 0,
    y : 0
}

export function playerInput (input) {

    switch (input.key) {
        case "ArrowDown":
            if(lastDirection.y !== 0) break;
            direction = { x : 0, y : 1 }
            break;
        case "ArrowUp":
            if(lastDirection.y !== 0) break;
            direction = { x : 0, y : -1 }
            break;
        case "ArrowLeft":
            if(lastDirection.x !== 0) break;
            direction = { x : -1, y : 0 }
            break;
        case "ArrowRight":
            if(lastDirection.x !== 0) break;
            direction = { x : 1, y : 0 }
            break;
        default:
            break;
    }
}

export function getSnakeDirection() {
    lastDirection = direction;
    return direction;
}