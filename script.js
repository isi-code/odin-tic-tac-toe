function player () {
    let name = "";
    let icon = "";
    const choices = [];

    const updateChoices = (choice) => {
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

    const resetChoices = () => { choices.forEach( c => choices.pop(c)) };

    return { updateChoices, getPlayerChoices, setIcon, setName, getIcon, getName, resetChoices }
}

const gameBoardLogic = (function () {
    const gameBoard = new Array(" "," "," "," "," "," "," "," "," ");

    const updateBoard = (index,playerName) => { 
        if ( gameBoard[index] === " " ) {
            gameBoard[index] = playerName;
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

const gameBoardDisplay = (function () {
    const updateBoard = (board, icon) => {
        board.addEventListener("click", (e)=>{ 
            if (e.target.tagName === "square"){
                e.style.content = icon;
            }
        })
    }

    const createGameboard = (container) => {
        const gameboard = document.createElement("div");
        gameboard.setAttribute("class", "gameboard");
        for (let i = 0; i < 9; i++){
            let square = document.createElement("div");
            
            square.setAttribute("class","square");
            gameboard.appendChild(square);
        }
        let fontCredit = document.createElement("p");
        fontCredit.textContent = "Font by MadPixel";
        container.appendChild(gameboard);
        container.appendChild(fontCredit);

        return gameboard
    }

    const showResults = (gameboard) => { 
        gameboard.remove(); 
    }

    return { createGameboard, updateBoard}
    })()

const gameLogic = (function () {
    const player1 = player();
    const player2 = player();

    const setPlayersInfo = (icon1 = "X", icon2 = "O") => {
        let playerName = prompt("Player 1 name:")
        player1.setName(playerName);
        player1.setIcon(icon1);

        playerName = prompt("Player 2 name:")
        player2.setName(playerName);
        player2.setIcon(icon2);
    }

    const askPlayerChoice = () => {
        let askNumber;

        const choices = player1.getPlayerChoices().concat( player2.getPlayerChoices() );

        do {
            askNumber = parseInt(prompt("Type a number (0-8): "));
        }
        while ( isNaN(askNumber) || askNumber > 8 || askNumber < 0 || choices.includes(askNumber) );

        return askNumber
    };

    const winner = (playerName,playerChoices) =>{
        const winConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8] ]
        for (let wcs of winConditions){
            let count = 0;            
            for (let idx of wcs){
                if (playerChoices.includes(idx)) count++;
            }
            if(count === 3) {
                console.log(`Player ${playerName} wins`)
                return true
            }
            else count = 0;
        }
        return false
    }

    const isGameOver = (turn) => {
        const currentBoardState = gameBoard.getGameBoardArray();
        const p1Choice = player1.getPlayerChoices();
        const p2Choice = player2.getPlayerChoices();

        if (!currentBoardState.includes(" ")){
            console.log("It's a tie");
            return true
        }

        if (turn >= 4){
            const playerName1 = player1.getName();
            const playerName2 = player2.getName();
            if (winner(playerName1, p1Choice)){
                return true
            }
            else if (winner(playerName2, p2Choice)){
                return true
            }
        }
        return false
    };

    const gameMatch = (board,turn) => {
        const currentPlayer = (turn % 2 === 0) ? player1 : player2;
        gameBoardDisplay.updateBoard(board, currentPlayer.getIcon());
        //const playerChoice = askPlayerChoice();
        //currentPlayer.updateChoices(playerChoice);
        //gameBoardDisplay.updateBoard(currentPlayer.getIcon());
    }

    const resetGame = () => {
        gameBoard.resetGameBoard();
        player1.resetChoices();
        player2.resetChoices();
    }

    return { 
        setPlayersInfo, 
        isGameOver,
        gameMatch,
        resetGame
    }
})()

const gameboardContainer = document.querySelector("section");
let keepPlaying = true;
while (keepPlaying){
    let question = prompt("Do you want to play Tic Tac Toe? (y/n)");

    if (question === "y"){
        let gameOver;
        let turn = 0;
        gameLogic.setPlayersInfo();
        const gameboard = gameBoardDisplay.createGameboard(gameboardContainer);
        while (!gameOver){
            gameLogic.gameMatch(gameboard,turn);
            turn ++;
            gameOver = gameLogic.isGameOver(turn);
        }
        gameLogic.resetGame();
        turn = 0;
    } else {
        keepPlaying = false
    }
}