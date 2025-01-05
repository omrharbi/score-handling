let gameArea = document.getElementById("game-area");

function drawElement(elementId, elementClass) {
  let element = document.createElement("div");
  element.id = elementId;
  element.classList.add(elementClass);
  gameArea.appendChild(element);
}

drawElement("ball", "ball-class");
drawElement("paddle", "paddle-class");
