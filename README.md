# Tic Tac Toe Game

Create a Tic Tac Toe game with JavaScript CSS and HTML.

[Preview](https://isi-code.github.io/odin-tic-tac-toe/)


## Requirements

- [ ] Store the gameboard as an array inside of a Gameboard object.
- [ ] Players are also going to be stored in objects
- [ ] Tuck as much as you can inside factories
-  [ ] Have as little global code as possible
- [ ] Once you have a working console game, create an object that will handle the display/DOM logic.
- [ ] Write the functions that allow players to add marks to a specific spot on the board by 
    interacting with the appropriate DOM elements (e.g. letting players click on a board square 
    to place their marker). Don’t forget the logic that keeps players from playing in spots
    that are already taken!
- [ ] Clean up the interface to allow players to put in their names, include a button 
    to start/restart the game and add a display element that shows the results upon game end!

## Plan / Pseudocode

**Player**

- Player's name and icon, and lastChoice property.
- Array with player's valid choices property (1 - 9).
- Method to set player icon and name.
- Method to update choices array and prevent duplicates or wrong values.

**Board**

- Array property with 9 keys representing the board
- Add property to indicate player's turn
- Add property to heck if game is over
- Method that checks whether the win or tie conditions are met
  - **Win conditons**
    - (1,2,3)
    - (4,5,6)
    - (7,8,9)
    - (1,5,9)
    - (3,5,7)
  - **Tie conditions**
    - All nine spaces are marked no condition above is met by a single player
- Method that will update the game board with player choices
- Method to prevent playing the same square
- Method to start / restart the game
 