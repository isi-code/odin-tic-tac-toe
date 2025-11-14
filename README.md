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

- Player's name and icon property.
- Array that stores player's valid choices property (must be numbers from 0 - 8).
- Method to update choices array and prevent duplicates or wrong values.
- Method to set player icon and name.
- Methods that returns icon, name and choices

**Board**

- Array property with 9 spaces representing the board
- Method that will update the game board
- Method that return current board

***controlGameFlow**
- Add property to check if game is over
- Method to 
- Method that checks whether the win or tie conditions are met
  - **Win conditons**
    - (0,1,2)
    - (3,4,5)
    - (6,7,8)
    - (0,4,8)
    - (2,4,6)
  - **Tie conditions**
    - All nine spaces are marked no condition above is met by a single player
 