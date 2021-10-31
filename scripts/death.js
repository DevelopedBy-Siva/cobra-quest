import Configs from "../configs/Configs.js";
import { returnHome } from "./dialog.js";
import { getSnakeBody } from "./game.js";
import { playerInput } from "./playerInput.js";
import { changePause } from "./screens.js";

const GRID_SIZE = Configs.GRID_SIZE;

function checkDeath() {
    const {x, y} = getSnakeBody()[0];
    let dead = false;
    if(x < 1 || x > GRID_SIZE || y < 1 || y > GRID_SIZE) {
        changePause(true);
        dead = true;
    }
    if(dead){
        window.removeEventListener("keydown", playerInput)
        createGameOverElement();
    }
}

function createGameOverElement() {

    const container = document.createElement("div");
    container.classList.add("game-over");
    container.id = "game-over";

    const content = document.createElement("div");
    content.className = "game-over-content";

    const title = document.createElement("h2");
    title.innerHTML = "GAME<br>OVER";
    content.appendChild(title);

    const subHead = document.createElement("h4");
    subHead.innerText = "SCORE";
    content.appendChild(subHead);

    const score = document.createElement("h3");
    score.innerText = "18900";
    content.appendChild(score);

    const button = document.createElement("button");
    button.innerText = "OK";
    content.appendChild(button);

    container.appendChild(content);

    const gameScreen = document.getElementsByClassName("game-screen")[0];
    gameScreen.appendChild(container);

    button.addEventListener("click", () => {
        returnHome(); // Back to Home Screen
        container.remove(); // Remove Game Over container
    });
}

export {
    checkDeath
}