function player () {
    let name = "";
    let icon = "";
    const choices = [];

    const updateChoices = (choice) => {
        if ( choices.includes(choice) && (choice <= 8 && choice > 0 ) ) {
            choices.push(choice);
        }
       };

    const setIcon = (playerIcon) => { icon = playerIcon };

    const setname = (playerName) => { name = playerName };

    const getIcon = () => { return icon };

    const getName = () => { return name };

    return { updateChoices, setIcon, setname, getIcon, getName }
}

const gameBoard = (function () {
    const gameBoard = new Array("","","","","","","","","");

    const updateBoard = (index) => {
        gameBoard[index]
    }

    const getGameBoard = () => { return gameBoard }

    return { updateBoard, getGameBoard }
})()

const gameLogic = (function () {
    const player1 = player();
    const player2 = player();
    //let gameOver = false;

    const askPlayerChoice = () => {
        let askNumber;
        do {
            askNumber = parseInt(prompt("Type a number (1-8): "));
        } while ( typeof askNumber === "number" && gae );

        gameBoard.updateBoard(askNumber);
        return askNumber
    }

    const isGameOver = () => {
        const currentBoardState = gameBoard.getGameBoard();

        if (!currentBoardState.inludes("")){
            console.log("It's a tie");
            return false
        }

    }

    return { isGameOver }

})(playerName1,playerName2)
