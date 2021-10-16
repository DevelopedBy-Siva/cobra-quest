import { removeDialogBox } from "./dialog.js";

let START_GAME = false;
const ANIMATION_SPEED = 35;

const gameContainer = document.getElementsByClassName("game-container");

// Game Start/ Exit Buttons
const startButton = document.getElementById("start");
const exitButton = document.getElementById("exit");

// disable Exit button for the First Launch
exitButton.disabled = true;

// Optimise browser performance by triggering the event only after few "ms"
const handleWindowResize = () => {
    let execute = false;
    return () => {
        
        if(execute)
            return;

        execute = true;
        setTimeout(() => {

            if(START_GAME)
                gameContainer[0].scrollTop = window.innerHeight;
            else
                gameContainer[0].scrollTop = 0

            execute = false;
        }, 300);
    }
}

const resizeScreen = handleWindowResize();

// Make sure resizing the window doesn't create a screen conflict
window.addEventListener("resize", resizeScreen);

// Move between the screen based on button "CLICK"
export const moveBetweenScreens = async() => {
    const screenAnimation = handleScreenAnimation(!START_GAME ? 0 : window.innerHeight);
    disableButtons(); // Disable Buttons
    await screenAnimation();
    START_GAME = START_GAME ? false : true;
    if(!START_GAME) removeDialogBox();
}

// Screen Scroll Animation
const handleScreenAnimation = (current) => {

    let position = current;
    let request;
    return function execute () {
        return new Promise( resolve => startAnimate(resolve, position, request));
    }
}

// Screen Scroll Animation
const startAnimate = (callback, position, request) => {

    if(!START_GAME) {
        position += ANIMATION_SPEED;
        
        if(position >= window.innerHeight)
            return endAnimate(position, request, callback);

    } else { 
        position -= ANIMATION_SPEED;
        if(position <= 0)
            return endAnimate(position, request, callback);
    }
    gameContainer[0].scrollTop = position;
    request = requestAnimationFrame(() => startAnimate(callback, position, request));
}

// End Scroll Animation
const endAnimate = (position, request, callback) => {
    gameContainer[0].scrollTop = position;
    cancelAnimationFrame(request)
    callback();
}

// Disable Buttons
const disableButtons = () => {
    if(START_GAME){
        startButton.disabled = false;
        exitButton.disabled = true;
    } else {
        startButton.disabled = true;
        exitButton.disabled = false;
    }
}