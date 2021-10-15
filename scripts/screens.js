let START_GAME = false;

const gameContainer = document.getElementsByClassName("game-container");

// Make sure resizing the window doesn't create a screen conflict
window.addEventListener("resize", () => {
    if(START_GAME)
        return gameContainer[0].scrollTop = window.innerHeight
    gameContainer[0].scrollTop = 0
});

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