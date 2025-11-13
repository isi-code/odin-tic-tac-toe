function player(name,icon) {
    const name = name;
    const icon = icon;
    const choices = [];

    const updateChoice = (choice) => { 
        choices.push(choice);
       }

    return { updateChoice }
}

function gameBoard() {
    const gameBoard = new Array("","","","","","","","","");
    let playerTurn = "";
    let gameOver = false;
}

let player1Name = input("What is Player1 name?");
let player2Name = input("What is Player2 name?");

const player1 = player(player1Name,"O")
const player2 = player(player2Name,"X")

let question = input("Choose a number from 1 - 9: ");
player1.updateChoice(question);
question = input("Choose a number from 1 - 9: ");
player2.updateChoice(question);
