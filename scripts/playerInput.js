let direction = {
  x: 0,
  y: 0,
};

let lastDirection = {
  x: 0,
  y: 0,
};

const control = document.querySelectorAll(".control");
const controlsContainer = document.querySelector("#controls");

const gamepad = document.querySelector(".gamepad");

function playerInput(input) {
  switch (input.key) {
    case "ArrowDown":
      if (lastDirection.y !== 0) break;
      direction = { x: 0, y: 1 };
      break;
    case "ArrowUp":
      if (lastDirection.y !== 0) break;
      direction = { x: 0, y: -1 };
      break;
    case "ArrowLeft":
      if (lastDirection.x !== 0) break;
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastDirection.x !== 0) break;
      direction = { x: 1, y: 0 };
      break;
    default:
      break;
  }
}

function getSnakeDirection() {
  lastDirection = direction;
  return direction;
}

function resetDirections() {
  const reset = {
    x: 0,
    y: 0,
  };
  direction = { ...reset };
  lastDirection = { ...reset };
}

control.forEach((item) => {
  item.addEventListener("click", (e) => {
    const option = e.target.dataset.option;
    let key;
    switch (option) {
      case "up":
        key = "ArrowUp";
        break;
      case "down":
        key = "ArrowDown";
        break;
      case "left":
        key = "ArrowLeft";
        break;
      case "right":
        key = "ArrowRight";
        break;
      default:
        return;
    }

    const event = new KeyboardEvent("keydown", {
      code: key,
      key: key,
      bubbles: true,
    });
    document.dispatchEvent(event);
  });
});

gamepad.addEventListener("click", () => {
  controlsContainer.classList.toggle("show-controls");
});

export { getSnakeDirection, resetDirections, playerInput };
