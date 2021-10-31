import Configs from "../configs/Configs.js";
import { checkDeath } from "./death.js";
import { drawFood, updateFood } from "./food.js";
import { PlayerScore } from "./player_s_Object_s.js";
import { getPause } from "./screens.js";
import { updateSnake, drawSnake } from "./snake.js"

const SNAKE_SPEED = Configs.SNAKE_SPEED;
const initialSnakePosition = Configs.SNAKE_INITIAL_POSITION;

let snakeBody = [
    {
        x : initialSnakePosition,
        y : initialSnakePosition
    }
];

const playground = document.getElementById("playground");
let playerScore;
let playAnimate;

function generateThePlayground(){

    let lastRender = 0;
    playerScore = new PlayerScore();
    return function play(time) {
        playAnimate = requestAnimationFrame(play);
        if( !getPause() ){
            const sinceLastRender = (time - lastRender)/1000;
            if(sinceLastRender < 1/SNAKE_SPEED) 
                return;
            lastRender = time;
            update();
            draw();
        }
    }
}

function update() {
    updateFood();
    updateSnake(snakeBody);
    checkDeath();
}

function draw() {
    drawSnake(playground, snakeBody);
    drawFood();
}

function checkFoodAndSnakePositions(food) {
    return snakeBody.some( snake => {
        if(snake.x === food.x && snake.y === food.y){
            return true;
        }
    })
}

function getSnakeBody() {
    return snakeBody;
}

function setSnakeBody(body) {
    snakeBody = body;
}

function getPlaygroundAnimateFrame() {
    return playAnimate;
}

function getPlayerScoreObject() {
    return playerScore;
}

export {
    generateThePlayground,
    checkFoodAndSnakePositions,
    getSnakeBody,
    setSnakeBody,
    getPlaygroundAnimateFrame,
    getPlayerScoreObject   
}