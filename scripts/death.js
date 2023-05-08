import Configs from "../configs/Configs.js";
import { returnHome } from "./dialog.js";
import { getPlayerScoreObject, getSnakeBody } from "./game.js";
import { allPlayers } from "./index.js";
import { playerInput } from "./playerInput.js";
import { loadPlayers } from "./players.js";
import { changePause, updateScoreShownInDOM } from "./screens.js";

const GRID_SIZE = Configs.GRID_SIZE;
const SCORE_LIMIT = Configs.SCORE_LIMIT;

function checkDeath() {
  let outside = outsideGrid();
  let intersect = snakeIntersection();
  if (outside || intersect) {
    window.removeEventListener("keydown", playerInput);
    const playerScore = getPlayerScoreObject();
    const highScore = allPlayers.getHighScore();
    if (playerScore) {
      allPlayers.setPlayerScore(playerScore.getPlayerScore());
    }
    updateScoreShownInDOM();
    createGameOverElement(highScore);
  }
}

function outsideGrid() {
  const { x, y } = getSnakeBody()[0];
  let dead = false;
  if (x < 1 || x > GRID_SIZE || y < 1 || y > GRID_SIZE) {
    changePause(true);
    dead = true;
  }
  return dead;
}

function snakeIntersection() {
  return onSnake(getSnakeBody()[0], { ignoreHead: true });
}

function onSnake(position, { ignoreHead = false } = {}) {
  return getSnakeBody().some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return checkPosition(segment, position);
  });
}

function checkPosition(pos1, pos2) {
  if (pos1.x === pos2.x && pos1.y === pos2.y) {
    changePause(true);
    return true;
  }
  return false;
}

function createGameOverElement(highScore) {
  const container = document.createElement("div");
  container.classList.add("game-over");
  container.id = "game-over";

  const content = document.createElement("div");
  content.className = "game-over-content";

  const title = document.createElement("h2");
  title.innerHTML = "GAME<br>OVER";
  content.appendChild(title);

  // Get Player Score Details
  const details = getCurrentScore(highScore);

  const subHead = document.createElement("h4");
  subHead.innerHTML = details.title;
  content.appendChild(subHead);

  const score = document.createElement("h3");
  score.innerText = details.score;
  content.appendChild(score);

  const button = document.createElement("button");
  button.innerText = "OK";
  content.appendChild(button);

  container.appendChild(content);

  const gameScreen = document.getElementsByClassName("game-screen")[0];
  gameScreen.appendChild(container);

  button.addEventListener("click", () => resetTheGame(container));
}

// Reset The Game
function resetTheGame(container) {
  refreshLocalStorage();
  returnHome(); // Back to Home Screen
  const scoreElement = document.querySelector(".game-screen #score span");
  scoreElement.innerHTML = (function () {
    let limit = 0;
    let score = "";
    while (limit < SCORE_LIMIT) {
      score += "0";
      limit++;
    }
    return score;
  })();
  setTimeout(() => {
    container.remove(); // Remove Game Over container
  }, 500);
}

// Reload the Players from the LocalStorage
function refreshLocalStorage() {
  const playerList = document.getElementsByClassName("user-list-container")[0];
  playerList.innerHTML = "";
  loadPlayers();
}

function getCurrentScore(highScore) {
  const playerScoreObj = getPlayerScoreObject();
  const score = playerScoreObj.getPlayerScore();

  let title = "YOUR SCORE";
  if (highScore < score) {
    title = "CONGRATULATIONS!!! <br> YOU HAVE GOT A NEW HIGHSCORE";
  }
  return {
    title,
    score,
  };
}

export { checkDeath, allPlayers };
