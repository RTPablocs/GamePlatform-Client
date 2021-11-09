'use strict';
/* 
[TO GENERATE DUMMIES]
JSON.stringify(Array(40).fill().map(e => ({
    name: ["Buscaminas", "Sudoku", "Tetris", "Space Invaders"][Math.random()*4|0],
}))) 
*/

//---------[ UTIL FUNCTIONS]--------\\

/* Select a part of the HTML*/
const $ = selector => document.querySelector(selector);

/* Generates a Random color with a low alfa to get the same color armony */
function randomColor() {
    const random = max => Math.random() * max;
    return `rgba(${random(85) + 100}, ${random(85) + 100}, ${random(85) + 100}, 0.48);`
}

//-------------[END]--------------\\

//---------[ LOAD VIEW FUNCTIONS ]--------\\

async function loadGames() {
    try {
        var games = await fetch('./db/games.json');
        games = await games.json();
        games.forEach(game => {
            gamesDiv.insertAdjacentHTML("beforeend",
            `<div class="game-card">
            <div class="g-name" style="background-color: ${randomColor()};">${game.name}</div>
            </div>`
            )
        });
    } catch (err) {
        console.log(err)
    }
}
//---------[ END ]--------\\


//---------[ PAGE STARTS ]--------\\
const gamesDiv = $(".game-list-container");

async function onInit() {
    await loadGames();
}

window.addEventListener('load', onInit);
//---------[ END ]--------\\