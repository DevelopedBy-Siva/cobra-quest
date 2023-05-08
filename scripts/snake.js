import Configs from "../configs/Configs.js";
import { getPlaygroundAnimateFrame, setSnakeBody } from "./game.js";
import { getSnakeDirection } from "./playerInput.js";

const initialSnakePosition = Configs.SNAKE_INITIAL_POSITION;
const playground = document.getElementById("playground");
let newSegment = 0;

function updateSnake(snakeBody) {
  addSegment(snakeBody);
  const snakeDirection = getSnakeDirection();
  for (let index = snakeBody.length - 2; index >= 0; index--) {
    snakeBody[index + 1] = { ...snakeBody[index] };
  }

  snakeBody[0].x += snakeDirection.x;
  snakeBody[0].y += snakeDirection.y;
}

function drawSnake(container, snakeBody) {
  playground.innerHTML = "";
  snakeBody.forEach((pos) => {
    const block = document.createElement("div");
    block.style.gridRowStart = pos.y;
    block.style.gridColumnStart = pos.x;
    block.classList.add("snake-body");
    container.appendChild(block);
  });
}

function resetSnake() {
  let snakeBody = [
    {
      x: initialSnakePosition,
      y: initialSnakePosition,
    },
  ];
  setSnakeBody(snakeBody);
  const animateFrame = getPlaygroundAnimateFrame();
  if (animateFrame) cancelAnimationFrame(animateFrame);
}

function addSegment(snakeBody) {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  newSegment = 0;
}

function expandSnake(rate) {
  newSegment += rate;
}

export { updateSnake, drawSnake, resetSnake, expandSnake };
