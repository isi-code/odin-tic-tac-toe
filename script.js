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

const gameBoard = (function () {
    const gameBoard = new Array(" "," "," "," "," "," "," "," "," ");

    const updateBoard = (index,playerIcon) => { 
        if ( gameBoard[index] === " " ) {
            gameBoard[index] = playerIcon;
            return true
        }
        return false;
    }

    const getGameBoardArray = () => {return gameBoard}

    const getGameBoard = () => { 
        return`
 ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
---+---+---
 ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
---+---+---
 ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
        `
    };

    const resetGameBoard = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = " ";
        }
    }

    return { updateBoard, getGameBoard, getGameBoardArray, resetGameBoard}
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

    const gameMatch = (turn) => {
        const currentPlayer = (turn % 2 === 0) ? player1 : player2;
        const playerChoice = askPlayerChoice();
        currentPlayer.updateChoices(playerChoice);
        gameBoard.updateBoard(playerChoice, currentPlayer.getIcon());
        return gameBoard.getGameBoard()
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

let keepPlaying = true;
while (keepPlaying){
    let question = prompt("Do you want to play Tic Tac Toe? (Y/N)");

    if (question.toLowerCase() === "y"){
        let gameOver;
        let turn = 0;
        gameLogic.setPlayersInfo();
        while (!gameOver){
            console.log(gameLogic.gameMatch(turn));
            turn ++;
            gameOver = gameLogic.isGameOver(turn);
        }
        gameLogic.resetGame();
        turn = 0;
    } else {
        keepPlaying = false
    }
}