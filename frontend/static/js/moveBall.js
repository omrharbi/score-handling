let ball = document.getElementById("ball");
let bricks = document.getElementsByClassName("brick")
let scoreDisplay = document.getElementById("score");

let RocksNum = 3
let timerInterval;
let first = true
const gameState = {
  first : true,
  speed: 7,
  score: 0,
  isPaused: false,
  ball: {x: 300, y: 520, velocityX: -2, velocityY: 3}
};

function bricksBreakid(ballRect) {

  for (let brick of bricks) {
    let brickRect = brick.getBoundingClientRect();

    if (detecteted(ballRect, brickRect) && !brick.classList.contains('breaked')) {
      let hitPosition = postion(ballRect, brickRect);

      if (hitPosition < -0.5) {
        gameState.ball.velocityY *= -1;
      } else if (hitPosition > 0.5) {
        gameState.ball.velocityY *= 1;
      } else {
        gameState.ball.velocityY *= 0.5;
      }

      brick.classList.add('breaked');
      updateScore()
      updateBallVelocity(hitPosition)
    
      if (ballRect.bottom >= brickRect.top && ballRect.top <= brickRect.top) {
        gameState.ball.velocityY *= 1 
      } else if (ballRect.top <= brickRect.bottom && ballRect.bottom >= brickRect.bottom) {
        gameState.ball.velocityY *= -1
      }
    }
  }
}


function moveBall() {
  gameState.ball.x += gameState.ball.velocityX;
  gameState.ball.y += gameState.ball.velocityY;

  let ballRect = ball.getBoundingClientRect()
  let paddleRect = paddle.getBoundingClientRect()
  let game = div.getBoundingClientRect()

  if (gameState.ball.x <= 0) {
    gameState.ball.x = 0
    gameState.ball.velocityX *= -1;
  } else if (gameState.ball.x > game.width - ballRect.width) {
    gameState.ball.x = game.width - ballRect.width
    gameState.ball.velocityX *= -1;
  }
  if (gameState.ball.y <= 0) {
    gameState.ball.velocityY *= -1;
  }

  bricksBreakid(ballRect)
  checkYouWin()

  if (detecteted(ballRect, paddleRect)) {

    let hitPosition = postion(ballRect, paddleRect);
    isrecersived = false

    if (hitPosition < -0.3) {
      gameState.ball.velocityX *= -1
    }
    else if (hitPosition > 0.3) {
      gameState.ball.velocityX *= 1
    }
    else {
      gameState.ball.velocityX *= 0.5;
    }

    updateBallVelocity(hitPosition)

  }

  ball.style.transform = `translate(${gameState.ball.x}px, ${gameState.ball.y}px)`;

  if (gameState.ball.y > 600) {
        RocksNum--;
        RocksDisplay.innerHTML = 'Rocks: '+RocksNum;
        paddlePosition = 235;
        gameState.ball = {x: 300, y: 520, velocityX: -2, velocityY: 3};
        gameState.isPaused = false;
        moveBall()
  } else if (RocksNum == 2 && first){
    handleLoseOneRock()
    first = false
  } else if (RocksNum == 1 && !first) {
    handleLoseTwoRock()
    first = true
  } else if (RocksNum == 0){
    gameStates('GAME OVER')
  } else if (!gameState.isPaused) {
    requestAnimationFrame(moveBall);
  }
}

function detecteted(ballRect, rect) {
  return ballRect.right >= rect.left &&
    ballRect.left <= rect.right &&
    ballRect.bottom >= rect.top &&
    ballRect.top <= rect.bottom
}

function postion(ballRect, rect) {
  let ballCenter = ballRect.x + ballRect.width / 2;
  let paddleCenter = rect.x + rect.width / 2;
  let hitPosition = ballCenter - paddleCenter;
  let direction = hitPosition / (rect.width / 2);
  return direction
}

function startTimer() {
  let seconds = 1;
  let minutes = 0;
  let secondsPrefix = '0';
  let minutesPrefix = '0';
  
  timerInterval = setInterval(() => {
      if (!gameState.isPaused) {
          timerDisplay.innerHTML = `Timer: ${minutesPrefix}${minutes}:${secondsPrefix}${seconds}`;
          
          if (seconds >= 9) secondsPrefix = '';
          if (minutes >= 9) minutesPrefix = '';
          
          if (seconds === 60) {
              secondsPrefix = '0';
              seconds = 0;
              minutes++;
          }
          seconds++;
      }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval)
}

function updateBallVelocity(hitPosition) {
  let angleEffect = hitPosition * Math.PI / 6;
  gameState.ball.velocityX = (gameState.speed * Math.sin(angleEffect));
  gameState.ball.velocityY = -Math.abs(gameState.speed * Math.cos(angleEffect));
}

function updateScore() {
  gameState.score++;
  scoreDisplay.innerHTML = `Score: ${gameState.score}`;
}

function checkYouWin() {
  for (let brick of bricks) {
    if (!brick.classList.contains('breaked')) {
      return
    }
  }
  gameStates('YOU WIN');
}