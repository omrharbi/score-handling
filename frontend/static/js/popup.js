
const popup = document.querySelector('.popup');
const shadowBackground = document.querySelector('.shadow-background');
const btnPause = document.getElementById('pause');
const timerDisplay = document.getElementById('timer');
const RocksDisplay = document.getElementById('Rocks');
let page = 1;
let totalPages = 0;
function createImage(path, id) {
    const img = document.createElement('img');
    img.src = path;
    img.id = id;
    return img;
}

function createInput(id) {
    const input = document.createElement('input');
    input.id = id;
    input.classList = "input"
    input.type = "text"
    return input;
}

function createHeading(text) {
    const heading = document.createElement('h2');
    heading.textContent = text;
    return heading;
}


function createScors(row) {
    const table = document.createElement('table');
    table.className = 'table'
    const header = document.createElement('tr');
    const headers = ['Rank', 'Name', 'Score', 'Time'];
    headers.forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        header.appendChild(th);
    });
    table.appendChild(header);
    table.appendChild(row);

    return table;

}
function createButton(text, id = '', className = '') {
    const button = document.createElement('button');
    button.textContent = text;
    if (id) button.id = id;
    if (className) button.className = className;
    return button;
}

function showPopup() {
    shadowBackground.style.display = 'block';
    popup.classList.add('open-popup');
}

function hidePopup() {
    popup.classList.remove('open-popup');
    shadowBackground.style.display = 'none';
}

function clearPopup() {
    popup.innerHTML = '';
}

function resetGameState() {
    gameState.ball = { x: 300, y: 520, velocityX: -2, velocityY: 3 };
    gameState.isPaused = false;
    gameState.score = 0;
}

//--------------------------Story Game-----------------//

function handleIwillhelpButton() {
    document.getElementById('help').addEventListener('click', () => {
        clearPopup();
        popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
        popup.appendChild(createImage('static/styles/part2.jpg', 'story'));
        popup.appendChild(createButton('Play', 'play'));

        showPopup();
        handlePlayButton();
    });
}

function handleLoseOneRock() {
    gameState.isPaused = true;
    clearPopup();
    showPopup();

    popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
    popup.appendChild(createImage('static/styles/part4.jpg', 'story'));
    popup.appendChild(createButton('Continue', 'resume'));
    popup.appendChild(createButton('Give Up', 'quit'));

    handleQuitButton();
    handleResumeButton();
}

function handleLoseTwoRock() {
    gameState.isPaused = true;
    clearPopup();
    showPopup();

    popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
    popup.appendChild(createImage('static/styles/part5.jpg', 'story'));
    popup.appendChild(createButton('Continue', 'resume'));
    popup.appendChild(createButton('Give Up', 'quit'));

    handleQuitButton();
    handleResumeButton();
}

function handlePlayButton() {
    document.getElementById('play').addEventListener('click', () => {
        startTimer();
        hidePopup();
        resetGameState();
        drawBricks();
        requestAnimationFrame(moveBall);
    });
}

function handleResumeButton() {
    document.getElementById('resume').addEventListener('click', () => {
        hidePopup();
        gameState.isPaused = false;
        requestAnimationFrame(moveBall);
    });
}

function handleRestartButton() {
    document.getElementsByClassName('restart')[0].addEventListener('click', () => {
        hidePopup();
        timerDisplay.innerHTML = 'Timer: 00:00';
        scoreDisplay.innerHTML = 'Score: 0';
        RocksDisplay.innerHTML = 'Rocks: 3';
        bricksContainer.innerHTML = '';

        RocksNum = 3;
        paddlePosition = 235;
        resetGameState();

        stopTimer();
        startTimer();
        drawBricks();
        requestAnimationFrame(moveBall);
    });
}

function handleQuitButton() {
    document.getElementById('quit').addEventListener('click', () => {
        hidePopup();
        bricksContainer.innerHTML = '';
        paddlePosition = 235;
        startGame();
    });
}

function pauseGame() {
    gameState.isPaused = true;
    clearPopup();
    showPopup();

    popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
    popup.appendChild(createHeading('Paused'));
    popup.appendChild(createButton('Continue', 'resume'));
    popup.appendChild(createButton('Restart', '', 'restart'));

    handleRestartButton();
    handleResumeButton();
}

function startGame() {
    clearPopup();

    popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
    popup.appendChild(createImage('static/styles/part1.jpg', 'story'));
    popup.appendChild(createButton('I will help', 'help'));

    showPopup();
    handleIwillhelpButton()
}

function gameStates(textGameState) {
    stopTimer();
    clearPopup();
    showPopup();
    resetGameState()
    gameState.isPaused = true;
    paddlePosition = 235;
    popup.style.width = '336px'

    popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
    popup.appendChild(createHeading(textGameState));

    const timeElement = document.createElement('h3');
    timeElement.textContent = timerDisplay.textContent;
    popup.appendChild(timeElement);

    const scoreElement = document.createElement('h3');
    scoreElement.textContent = scoreDisplay.textContent;
    popup.appendChild(scoreElement);
    if (textGameState == 'YOU WIN') {
        popup.appendChild(createImage('static/styles/part7.jpg', 'story'));
    } else {

        popup.appendChild(createImage('static/styles/part6.jpg', 'story'));
    }
    popup.appendChild(createButton('Restart', '', 'restart'));
    popup.appendChild(createButton('Quit', 'quit'));
    popup.appendChild(createButton('Save Your Rank !!', 'save',));
    HandlesavetButton()
    handleQuitButton();
    handleRestartButton();
}

function HandlesavetButton() {
    document.getElementById('save').addEventListener('click', () => {
        clearPopup()
        popup.style.width = '400px'
        popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
        popup.appendChild(createHeading('Enter Your Name'))
        popup.appendChild(createInput('input'))
        popup.appendChild(createButton('Save', 'send'));
        score()
    });
}

function Score_user(row) {
    clearPopup()
    popup.style.width = '400px'
    popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
    popup.appendChild(createScors(row))
    let div = document.createElement('div')
    div.className = "navigate"
    div.append(
        popup.appendChild(createButton("prev", 'prev'))
        , popup.appendChild(createButton("next", 'next')))

    popup.appendChild(div)
    popup.appendChild(createButton('Restart', 'restart', 'restart'))

    let next = document.getElementById('next')
    let priv = document.getElementById('prev')
    let restart = document.getElementById('restart')
    restart.addEventListener('click', () => {
        console.log('restart');
        
        handleRestartButton()
    })
    next.addEventListener('click', () => {
        nextPage(next)
    })
    priv.addEventListener('click', () => {
        prevPage(priv)
    })
   
}
function score() {
    let save = document.getElementById("send")
    save.addEventListener('click', async () => {
        let namePlayer = document.getElementById('input');
        if (namePlayer.value === '') {
            alert('Please enter your name');
        } else {
            let breaked = []
            let time = timerDisplay.textContent.split('Timer: ')
            let scoreD = scoreDisplay.textContent.split('Score: ')
            for (let brik of bricks) {
                if (!brik.classList.contains('breaked')) {
                    breaked.push(brik)
                }
            }
            let rank = 0
            if (breaked.length >= 0 && breaked.length <= 4)
                rank = 1
            if (breaked.length >= 5 && breaked.length <= 9)
                rank = 2
            if (breaked.length >= 10 && breaked.length <= 14)
                rank = 3
            if (breaked.length >= 15 && breaked.length <= 19)
                rank = 4
            if (breaked.length >= 20)
                rank = 5
            await sendScor(namePlayer.value, scoreD[1], time[1], rank)
        }

    })
}

async function sendScor(namePlayer, score, time, rank) {

    console.log(namePlayer, +score, time, rank);
    const responce = await fetch("/api/score", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: namePlayer,
            score: +score,
            time: time,
            rank: rank
        })
    })

    if (responce.ok) {
        await fetchScores()

    } else {
        let data = await responce.json()
        alert("error", data)
    }
}


async function fetchTotalPages() {
    const response = await fetch("/api/numberpages", {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        totalPages = data;
    } else {
        alert("Failed to fetch the total number of pages.");
    }
}

async function fetchScores() {
    const response = await fetch("/api/getscore?page=" + page, {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        if (response.ok) {
            const tableBody = document.createElement('tbody');
            Object.values(data).forEach(rowData => {
                let rnk = ""
                const row = document.createElement('tr');
                const rank = document.createElement('td');
                const name = document.createElement('td');
                const score = document.createElement('td');
                const time = document.createElement('td');
                if (rowData.rank === 1) {
                    rnk = 'st'
                }
                else if (rowData.rank === 2) {
                    rnk = 'nd'
                }
                else if (rowData.rank === 3) {
                    rnk = 'rd'
                } else {
                    rnk = 'th'
                }
                rank.textContent = rowData.rank + rnk;
                name.textContent = rowData.name;
                score.textContent = rowData.score;
                time.textContent = rowData.time;

                row.append(rank, name, score, time);
                tableBody.appendChild(row);
            });
            Score_user(tableBody)
            handleRestartButton()
        } else {
            alert("Failed to fetch scores.");
        }
    }
}

async function prevPage(prev) {
    if (page > 1) {
        page--;
        await fetchScores();
    } else {
       prev.style.display='none'
    }
}

// Navigate to the next page
async function nextPage(next) {
    if (page < totalPages) {
        page++;
        await fetchScores();
    } else {
        next.style.display='none'
    }
}

// Initialize pagination
async function initPagination() {
    await fetchTotalPages();

}

initPagination();


btnPause.addEventListener('click', pauseGame);

startGame();
