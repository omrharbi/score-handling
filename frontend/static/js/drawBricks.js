let bricksContainer = document.getElementById("bricks-container");
function drawBricks() {
RocksNum = 1  
  const colorList = [
    "red",
    "purple",
    "green",
  //  "blue",
  //   "pink",
    // "yellow",
    "cyan",
  ];
  for (let index = 0; index < colorList.length; index++) {
    createBricks(colorList[index]);
  }
}

function createBricks(brickColor) {
  for (let index = 0; index < 7 ; index++) {
    let brick = document.createElement("div");
    let brickFace = document.createElement("div");
    let brickShadow = document.createElement("div");
    brick.classList.add(brickColor)
    brickFace.classList.add(brickColor)
    brickShadow.classList.add('brick-shadow')
    brickFace.classList.add('brick-face')
    brick.classList.add('brick');
    brick.appendChild(brickFace);
    brick.appendChild(brickShadow);
    bricksContainer.append(brick);
  }
}
