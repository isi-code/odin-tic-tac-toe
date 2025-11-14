function player () {
    let name = "";
    let icon = "";
    const choices = [];

    const updateChoices = (choice) => {
        if ( !choices.includes(choice) && (choice <= 8 && choice > 0 ) ) {
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

    const getGameBoard = () => { 
        return`
 ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
---+---+---
 ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
---+---+---
 ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
        `
    };

    return { updateBoard, getGameBoard }
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

    const isGameOver = () => {
        const currentBoardState = gameBoard.getGameBoard();

        if (!currentBoardState.includes(" ")){
            console.log("It's a tie");
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

while (!gameLogic.isGameOver()){

    let player1Turn;    
    do {
        player1Turn = gameLogic.updatePlayer1Choices( gameLogic.askPlayerChoice() );
    } while (player1Turn === false);

    gameBoard.updateBoard(player1Turn, gameLogic.getPlayer1Icon())

    console.log(gameBoard.getGameBoard())

    let player2Turn;
    do {
        player2Turn = gameLogic.updatePlayer2Choices( gameLogic.askPlayerChoice() );
    } while (player2Turn === false);

    gameBoard.updateBoard(player2Turn, gameLogic.getPlayer2Icon())
    console.log(gameBoard.getGameBoard())
    
}
