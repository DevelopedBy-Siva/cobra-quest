let START_GAME = false;
const ANIMATION_SPEED = 35;

const gameContainer = document.getElementsByClassName("game-container");

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
    await screenAnimation();
    START_GAME = START_GAME ? false : true;
}

const handleScreenAnimation = (current) => {

    let position = current;
    let request;
    return function execute () {
        return new Promise( resolve => startAnimate(resolve, position, request));
    }
}

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

const endAnimate = (position, request, callback) => {
    gameContainer[0].scrollTop = position;
    cancelAnimationFrame(request)
    callback();
}