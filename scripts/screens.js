import Configs from "../configs/Configs.js";
import { removeDialogBox } from "./dialog.js";
import { generateThePlayground, getPlayerScoreObject } from "./game.js";
import { allPlayers } from "./index.js";
import { playerInput } from "./playerInput.js";

let START_GAME = false;
const ANIMATION_SPEED = Configs.SCROLL_ANIMATION_SPEED;
let PAUSE = false;

const gameContainer = document.getElementsByClassName("game-container");
const playground = document.getElementById("playground");

// Game Start/ Exit Buttons
const startButton = document.getElementById("start");
const exitButton = document.getElementById("exit");

// disable Exit button for the First Launch
exitButton.disabled = true;

const SCORE_LIMIT = Configs.SCORE_LIMIT;

// Optimise browser performance by triggering the event only after few "ms"
const handleWindowResize = () => {
  let execute = false;
  return () => {
    if (execute) return;

    execute = true;
    setTimeout(() => {
      if (START_GAME) gameContainer[0].scrollTop = window.innerHeight;
      else gameContainer[0].scrollTop = 0;

      execute = false;
    }, 0);
  };
};

const resizeScreen = handleWindowResize();

// Make sure resizing the window doesn't create a screen conflict
window.addEventListener("resize", resizeScreen);

// Move between the screen based on button "CLICK"
const moveBetweenScreens = async () => {
  if (allPlayers.getActivePlayer()) {
    // Checks if the Player Warning is present and is removed
    removePlayerWarningFromDOM();
    const screenAnimation = handleScreenAnimation(
      !START_GAME ? 0 : window.innerHeight
    );
    disableButtons(); // Disable Buttons
    await screenAnimation();
    START_GAME = START_GAME ? false : true;
    if (START_GAME) startTheGame();
    else {
      resetPlayground();
      removeDialogBox();
    }
  } else {
    // Warn the Player
    showPlayerWarning();
  }
};

// Screen Scroll Animation
const handleScreenAnimation = (current) => {
  let position = current;
  let request;
  return function execute() {
    return new Promise((resolve) => startAnimate(resolve, position, request));
  };
};

// Screen Scroll Animation
const startAnimate = (callback, position, request) => {
  if (!START_GAME) {
    position += ANIMATION_SPEED;
    if (position >= window.innerHeight)
      return endAnimate(position, request, callback);
  } else {
    position -= ANIMATION_SPEED;
    if (position <= 0) return endAnimate(position, request, callback);
  }
  gameContainer[0].scrollTop = position;
  request = requestAnimationFrame(() =>
    startAnimate(callback, position, request)
  );
};

// End Scroll Animation
const endAnimate = (position, request, callback) => {
  gameContainer[0].scrollTop = position;
  cancelAnimationFrame(request);
  callback();
};

// Disable Buttons
const disableButtons = () => {
  if (START_GAME) {
    startButton.disabled = false;
    exitButton.disabled = true;
  } else {
    startButton.disabled = true;
    exitButton.disabled = false;
  }
};

// Show player warning in the DOM
function showPlayerWarning() {
  const containerElement = document.createElement("div");
  containerElement.id = "warn-the-player";

  const warningElement = document.createElement("span");
  warningElement.innerText = "Please select or add a Player";

  containerElement.appendChild(warningElement);

  document
    .getElementsByClassName("game-cover")[0]
    .appendChild(containerElement);
}

// Remove Player warning in the DOM(if present)
function removePlayerWarningFromDOM() {
  try {
    document.getElementById("warn-the-player").remove();
  } catch (ex) {}
}

// Generate Snake
function startTheGame() {
  const generate = generateThePlayground();
  requestAnimationFrame(generate);
  window.addEventListener("keydown", playerInput);
  changePause(false);
}

// Reset Playground on QUIT
function resetPlayground() {
  window.removeEventListener("keydown", playerInput);
  const snake = document.querySelectorAll(".snake-body");
  snake.forEach((element) => playground.removeChild(element));
}

// Get/ Update game PAUSE
function getPause() {
  return PAUSE;
}

function changePause(val) {
  PAUSE = val;
}

function updateScoreShownInDOM() {
  try {
    const scoreElement =
      document.getElementsByClassName("current-user-score")[0];
    const score = allPlayers.getActivePlayer().score;
    if (score)
      scoreElement.innerHTML = `<span id="current-user-score-title">Score: </span> ${score}`;
  } catch (ex) {}
}

function updateDOMScore() {
  const scoreElement = document.querySelector(".game-screen #score span");
  const playerScoreObj = getPlayerScoreObject();
  const score = playerScoreObj.getPlayerScore();
  let limit = (score + "").length;
  let toShow = score;
  while (limit < SCORE_LIMIT) {
    toShow = "0" + toShow;
    limit++;
  }
  scoreElement.innerHTML = toShow;
}

export {
  moveBetweenScreens,
  getPause,
  changePause,
  removePlayerWarningFromDOM,
  updateScoreShownInDOM,
  updateDOMScore,
};
