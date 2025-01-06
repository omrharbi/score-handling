
// function Score_user(row) {
//     clearPopup()
//     popup.style.width = '400px'
//     popup.appendChild(createImage('static/styles/logo.jpg', 'logo'));
//     popup.appendChild(createScors(row))

// }
//   function score() {
//     let save = document.getElementById("send")
//     save.addEventListener('click', async () => {
//         let namePlayer = document.getElementById('input');
//         if (namePlayer.value === '') {
//             alert('Please enter your name');
//         } else {
//             let breaked = []
//             let time = timerDisplay.textContent.split('Timer: ')
//             let scoreD = scoreDisplay.textContent.split('Score: ')
//             for (let brik of bricks) {
//                 if (!brik.classList.contains('breaked')) {
//                     breaked.push(brik)
//                 }
//             }
//             let rank = 0
//             if (breaked.length >= 0 && breaked.length <= 4)
//                 rank = 1
//             if (breaked.length >= 5 && breaked.length <= 9)
//                 rank = 2
//             if (breaked.length >= 10 && breaked.length <= 14)
//                 rank = 3
//             if (breaked.length >= 15 && breaked.length <= 19)
//                 rank = 4
//             if (breaked.length >= 20)
//                 rank = 5
//             await sendScor(namePlayer.value, scoreD[1], time[1], rank)
//         }

//     })
// }

// async function sendScor(namePlayer, score, time, rank) {

//     console.log(namePlayer, +score, time, rank);
//     const responce = await fetch("/api/score", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: namePlayer,
//             score: +score,
//             time: time,
//             rank: rank
//         })
//     })

//     if (responce.ok) {
//         GetScore()

//     } else {
//         let data = await responce.json()
//         alert("error", data)
//     }
// }


// async function GetScore() {
//     const responce = await fetch("/api/getscore", {
//         method: 'GET',
//     })

//     if (responce.ok) {
//         let data = await responce.json()
//         const tableBody = document.createElement('tbody');
//         Object.values(data).forEach(rowData => {
//             const row = document.createElement('tr');
//             const rank = document.createElement('td');
//             const name = document.createElement('td');
//             const score = document.createElement('td');
//             const time = document.createElement('td');
//             rank.textContent = rowData.rank;
//             name.textContent = rowData.name;
//             score.textContent = rowData.score;
//             time.textContent = rowData.time;
//             row.append(rank, name, score, time);
//             tableBody.appendChild(row);
//         });
//         Score_user(tableBody)

//     } else {
//         let data = await responce.json()
//         alert("error", data)
//     }
// }
// window.score=score()