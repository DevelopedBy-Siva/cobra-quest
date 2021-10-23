export function playerInput (input) {

    switch (input.key) {
        case "ArrowDown":
            console.log("DOWN")
            break;
        case "ArrowUp":
            console.log("UP")
            break;
        case "ArrowLeft":
            console.log("LEFT")
            break;
        case "ArrowRight":
            console.log("RIGHT")
            break;
        default:
            break;
    }

}