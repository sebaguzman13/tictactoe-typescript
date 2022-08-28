# React Tic Tac Toe GAme

This is my first attemp building a Tic Tac Toe Game, and it was performed under a Chanlenge environment.

On the last commit (outside chalenge timers) I'd performed an update on the way the reset function should work, because on the first try I had attempted a shalow copy of the main array, which I forgot it will perform a copy of only the first level of the object containing the rows and entris of each possibly player entry (ES6 functionality).

## Start the app

To start the app clone the repository on your local environment, navigate through your terminal to the app root folder and type:

```
npm start
```
On the app started the first player will be the 'X' player.

## Gaming Dynamic

Each time a player clicks a tile it set it's value to the current players name, and changes the current player.

### Wining

Once a player gets a 3 row (horizontal, verticla or diagonal) an alert will be displayed announcing hte winning player and the game ends.
I in roder to play another round you'll have to click the rest button which will restart all tile's values and set the initial player back to the 'X' player.
