import Configs from "../configs/Configs.js";
import { checkFoodAndSnakePositions, getPlayerScoreObject } from "./game.js";
import { updateDOMScore } from "./screens.js";
import { expandSnake } from "./snake.js";

const playground = document.getElementById("playground");
const EXPANSION_RATE = Configs.SNAKE_EXPANSION_RATE;
const initialFoodPosition = Configs.FOOD_INITIAL_POSITION;
const GRID_SIZE = Configs.GRID_SIZE;

let foodPosition = {
  x: initialFoodPosition,
  y: initialFoodPosition,
};

// Create Snake Food
function drawFood() {
  // Create container element for food
  const element = document.createElement("div");
  element.classList.add("snake-food");

  // Create food image
  const foodImg = document.createElement("img");
  foodImg.alt = "snake-food";
  foodImg.src = "../images/apple.webp";

  element.appendChild(foodImg);

  element.style.gridRowStart = foodPosition.y;
  element.style.gridColumnStart = foodPosition.x;

  playground.appendChild(element);
}

function updateFood() {
  if (checkFoodAndSnakePositions(foodPosition)) {
    expandSnake(EXPANSION_RATE);
    const playerScoreObj = getPlayerScoreObject();
    if (playerScoreObj) playerScoreObj.setPlayerScore();
    updateDOMScore();
    foodPosition = generateFoodPosition();
  }
}

function generateFoodPosition() {
  let randomPosition;
  while (randomPosition == null || checkFoodAndSnakePositions(randomPosition)) {
    randomPosition = getRandomPosition();
  }
  return randomPosition;
}

function getRandomPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

export { updateFood, drawFood };
