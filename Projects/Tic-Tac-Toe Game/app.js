
const winPattern = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

const main = document.querySelector('main');
const rightHalf = document.querySelector('.rightHalf');
const leftHalf = document.querySelector('.leftHalf');
const container = document.querySelector('.container');
const playerName = document.querySelector('.container h2');
const game = document.querySelector('.game');
const homePage = document.querySelector('.home-page');
const resultPage = document.querySelector('.result-page');
const startGameBtn = document.querySelector('.home-page button');
const resetGameBtn = document.getElementById('reset-game');
const newGameBtn = document.getElementById('new-game')
const buttons = game.children;
const red = '#D84315';
const blue =  '#2196F3';

let countDisabledBtn = 0;
let turnX = true;

const displayWinner = (winner) => {
    container.classList.toggle('hide');
    resultPage.classList.toggle('hide');
    const message = resultPage.children[1];
    message.innerText = `Player \'${winner}\' Wins.`;
}

const displayDraw = () => {
    container.classList.toggle('hide');
    resultPage.classList.toggle('hide');
    resultPage.children[0].innerText = 'Draw!';
    resultPage.children[1].innerText = 'Get him next time.';
}

const switchTurns = () => {
    if (turnX) {
        // Change turn to player O
        turnX = false;
        main.style.backgroundColor = blue;
        playerName.innerText = 'Player \'O\'';
    } else {
        // Change turn to player X
        turnX = true;
        main.style.backgroundColor = red;
        playerName.innerText = 'Player \'X\'';
    }
}

const checkWinPattern = () => {  
    const checkFor = (turnX) ? 'X' : 'O';
    let gameEnd = false;
    for (const pattern of winPattern) {
        if (checkFor === buttons[pattern[0]].innerText && buttons[pattern[0]].innerText === buttons[pattern[1]].innerText && buttons[pattern[1]].innerText === buttons[pattern[2]].innerText) {
            gameEnd = true;
            displayWinner(checkFor);
            break;
        }
    }
    if (!gameEnd)
        switchTurns();
}

const upateValue = (button) => {
    if (turnX) {
        button.innerText = 'X';
    } else {
        button.innerText = 'O';
    }
    button.disableb = true;
    checkWinPattern();
}

const resetGame = () => {
    const buttonsArray = Array.from(buttons);
    buttonsArray.forEach(element => {
        element.innerText = '';
        element.disableb = false;    
    });

    if (!turnX)
        switchTurns();
}

startGameBtn.addEventListener('click', () => {
    homePage.classList.toggle('hide');
    container.classList.toggle('hide');
    rightHalf.classList.toggle('hide');
    leftHalf.classList.toggle('hide');
});

game.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && !event.target.disableb) {
        upateValue(event.target);
        if (++countDisabledBtn === 9) {
            displayDraw();
        }
    }
});

resetGameBtn.addEventListener('click', () => {
    resetGame();
});

newGameBtn.addEventListener('click', () => {
    resetGame();
    container.classList.toggle('hide');
    resultPage.classList.toggle('hide');
});
