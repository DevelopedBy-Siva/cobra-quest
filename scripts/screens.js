let START_GAME = false;

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
export const moveBetweenScreens = () => {
    if(START_GAME){
        gameContainer[0].scrollTop = 0;
        START_GAME = false;
        return;
    }
    START_GAME = true;
    gameContainer[0].scrollTop = window.innerHeight
}