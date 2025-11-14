function player () {
    let name = "";
    let icon = "";
    const choices = [];

    const updateChoices = (choice) => {
        if ( !choices.includes(choice) && (choice <= 8 && choice >= 0 ) ) {
            choices.push(choice);
            return choice
        }
        return false
       };

    const getPlayerChoices = () => { return choices };

    const setIcon = (playerIcon) => { icon = playerIcon };

    const setName = (playerName) => { name = playerName };

    const getIcon = () => { return icon };

    const getName = () => { return name };

    return { updateChoices, getPlayerChoices, setIcon, setName, getIcon, getName }
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

    return { updateBoard, getGameBoard, getGameBoardArray}
})()

const gameLogic = (function () {
    const player1 = player();
    const player2 = player();

    const updatePlayer1Choices = player1.updateChoices;
    const updatePlayer2Choices = player2.updateChoices;

    const getPlayer1Icon = player1.getIcon;
    const getPlayer2Icon = player2.getIcon;

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
        
        while ( typeof askNumber !== "number"){
            askNumber = parseInt(prompt("Type a number (0-8): "));
        };        
        
        return askNumber
    };

    const winner = (currentBoardState) =>{
        const winConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8] ]
        const p1Icon = player1.getIcon();
        const p2Icon = player2.getIcon();

        const turnsNumber = player1.getPlayerChoices().length + player2.getPlayerChoices().length 
        if (turnsNumber >= 5) {
            const mapWinCon= winConditions.map( winCon => {
                return winCon.map((idx)=>{
                    return currentBoardState[idx]
                })
            })
        
            for (let win of mapWinCon) {
                const p1IconCount= win.reduce((total, arrValue) => {
                    if (arrValue === p1Icon) total++
                    return total
                }, 0);

                const p2IconCount= win.reduce((total, arrValue) => {
                    if (arrValue === p2Icon) total++
                    return total
                }, 0);

                if (p1IconCount === 3) return true
                else if (p2IconCount === 3) return true
            }
        }
        return false
    }

    const isGameOver = () => {
        const currentBoardState = gameBoard.getGameBoardArray();

        if (!currentBoardState.includes(" ")){
            console.log("It's a tie");
            return true
        }

        else if (winner(currentBoardState)){
            return true
        }
        
        return false
    };

    return { 
        setPlayersInfo, 
        isGameOver,
        askPlayerChoice, 
        updatePlayer1Choices, 
        updatePlayer2Choices,
        getPlayer1Icon,
        getPlayer2Icon
    }
})()

gameLogic.setPlayersInfo();

let gameOver;

while (!gameOver){

    let playerTurn;    
    do {
        playerTurn = gameLogic.updatePlayer1Choices( gameLogic.askPlayerChoice() );
    } while (playerTurn === false);

    gameBoard.updateBoard(playerTurn, gameLogic.getPlayer1Icon());

    console.log(gameBoard.getGameBoard());

    gameOver = gameLogic.isGameOver();

    playerTurn = false;
    do {
        playerTurn = gameLogic.updatePlayer2Choices( gameLogic.askPlayerChoice() );
    } while (playerTurn === false);

    gameBoard.updateBoard(playerTurn, gameLogic.getPlayer2Icon());
    console.log(gameBoard.getGameBoard());

    gameOver = gameLogic.isGameOver();
}
