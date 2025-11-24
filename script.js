function player () {
    let name = "";
    let icon = "";
    const choices = [];

    const updateChoices = (choice) => {
        /* Update Choices array*/
        if ( !choices.includes(choice) && (choice <= 8 && choice >= 0 ) ) {
            choices.push(choice);
            return true
        }
        return false
       };

    const getPlayerChoices = () => { return choices };

    const setIcon = (playerIcon) => { icon = playerIcon };

    const setName = (playerName) => { name = playerName };

    const getIcon = () => { return icon };

    const getName = () => { return name };

    const resetChoices = () => { choices.length = 0 };

    return { updateChoices, getPlayerChoices, setIcon, setName, getIcon, getName, resetChoices }
}

const gameBoardLogic = (function () {
    const gameBoard = new Array(" "," "," "," "," "," "," "," "," ");

    const updateBoard = (index,playerIcon) => { 
        if ( gameBoard[index] === " " ) {
            gameBoard[index] = playerIcon;
            return true
        }
        return false;
    }

    const getGameBoardArray = () => {return gameBoard}

    const resetGameBoard = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = " ";
        }
    }

    return { updateBoard, getGameBoardArray, resetGameBoard }
})()

const gameBoardVisuals = (function () {
    const createGameboard = (container) => {
        const gameboard = document.createElement("div");
        gameboard.setAttribute("class", "gameboard");
        for (let i = 0; i < 9; i++){
            let square = document.createElement("div");
            square.setAttribute("class",'square');
            square.dataset.square = i;
            gameboard.appendChild(square);
        }
        let fontCredit = document.createElement("p");
        fontCredit.textContent = "Font by MadPixel";
        container.appendChild(gameboard);
        container.appendChild(fontCredit);

        return gameboard
    }

    const createScoreDisplay = (container, playerName1, playerName2, playerScore) =>{
        let displayScore = document.querySelector(".displayScore");
        if (!displayScore) {
            displayScore = document.createElement("div");
            displayScore.setAttribute("class","displayScore");
        }
        displayScore.innerHTML = `<p><b>Score:</b> <br> <span><b>${playerName1}</b>: ${playerScore[playerName1]}  - - -  <b>${playerName2}</b>: ${playerScore[playerName2]}</span></p>`;
        container.appendChild(displayScore);
    }

    const updateBoard = (square, turn, icon) => {
        const playerClass= (turn % 2 === 0) ? "first-player" : "second-player";
        square.setAttribute("class", playerClass)
        square.textContent = icon;
    }

    const resetGameBoard = (board) => {
        const squares = board.childNodes;
        squares.forEach((square)=>{
            square.className = "square";
            square.textContent = "";
        })
    }

    const removeBoard = (container) => { 
        while (container.firstChild){
            container.removeChild(container.firstChild)
        }
    }

    return { createGameboard, updateBoard, resetGameBoard, removeBoard, createScoreDisplay }
})()

const gameLogic = (function () {
    const player1 = player();
    const player2 = player();    
    const playerScore = {};

    const setPlayersInfo = (icon1 = "X", icon2 = "O") => {
        let playerName;
        do {
            playerName = prompt("Player 1 name:");

        } while (playerName === "");

        player1.setName(playerName);
        player1.setIcon(icon1);
        do {
            playerName = prompt("Player 2 name:");

        } while (playerName === "");
        player2.setName(playerName);
        player2.setIcon(icon2);
        playerScore[player1.getName()] = 0;
        playerScore[player2.getName()] = 0;
    }

    const winner = (playerName, playerChoices) =>{
        const winConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8] ]
        for (let wcs of winConditions){
            let count = 0;            
            for (let idx of wcs){
                if (playerChoices.includes(idx)) count++;
            }
            if(count === 3) {
                alert(`Player ${playerName} wins`)
                playerScore[playerName] += 1;
                return true
            }
            else count = 0;
        }
        return false
    }

    const isGameOver = (turn, playerName, playerChoices) => {
        const winnerResult = winner(playerName, playerChoices);
        if (!winnerResult && turn >= 8){
            alert("It's a tie");
            return true
        }

        if (turn >= 4) return winnerResult

        return false
    };

    const gameMatch = (turn, square) => {
        const currentPlayer = (turn % 2 === 0) ? player1 : player2;
        const playerName = currentPlayer.getName();
        const playerIcon = currentPlayer.getIcon();

        const playerChoice = parseInt(square.dataset.square);
        currentPlayer.updateChoices(playerChoice);

        gameBoardLogic.updateBoard(playerChoice, playerIcon );
        gameBoardVisuals.updateBoard(square, turn, playerIcon);

        const playerChoices = currentPlayer.getPlayerChoices();
        return gameLogic.isGameOver(turn, playerName, playerChoices);
    }

    const resetGame = (board) => {
        gameBoardVisuals.resetGameBoard(board);
        gameBoardLogic.resetGameBoard();
        player1.resetChoices();
        player2.resetChoices();
        for (let i in playerScore){
            delete playerScore[i];
        }
    }

    const showScore = (container) => {
        gameBoardVisuals.createScoreDisplay(container,player1.getName(),player2.getName(),playerScore);
    }                

    return { 
        setPlayersInfo, 
        isGameOver,
        gameMatch,
        showScore,
        resetGame
    }
})()

const playRestartBtn= document.querySelector("button");
const container = document.querySelector('section');
let turn = 0;
let gameboard = null;
let gameOver = false;

playRestartBtn.addEventListener("click", () => {
    if (gameboard) {
        gameLogic.resetGame(gameboard); 
        gameBoardVisuals.removeBoard(container);
    }
    gameOver = false;
    turn = 0;
    gameboard = gameBoardVisuals.createGameboard(container);
    gameLogic.setPlayersInfo();
});

container.addEventListener("click", (e) => {
    const square = e.target;
    
    if (!gameOver){
        if (square.className === "square"){
            gameOver = gameLogic.gameMatch(turn, square);
            turn ++
            if (gameOver) {
                gameLogic.showScore(container);
                setTimeout(()=>{
                let q = prompt("Do you want to keep playing Tic Tac Toe? (Y/N)");
                if (q === "y" || q === "Y") {
                    gameLogic.resetGame(gameboard);
                    turn = 0;
                    gameOver = false;
                }},1000)
        }}
    }
});