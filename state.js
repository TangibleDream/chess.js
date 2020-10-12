'use strict';
import { game } from './game.js'
import { boardRefresh, changePlayers, inCheck, inCheckMate, inStaleMate } from './helpers.js'

const stateOne = () => {
    game.gameState = 1;
    boardRefresh();
    let instructionMessage = '';
    if (inCheck()) {
      game.check = true;
      instructionMessage = 'You are in check!!!\r\n'
    }
    instructionMessage += 'What piece would you like to move?  Press button to end game';
    document.getElementById('instructionMessage').setAttribute('style', 'white-space: pre;');
    document.getElementById('instructionMessage').textContent = instructionMessage
    actionButton.textContent = 'Concede Game'
    actionButton.removeEventListener("click", stateOne);
    actionButton.removeEventListener("click", changePlayers);
    actionButton.addEventListener("click", stateFour);
};

const stateTwo = (move) => {
    game.gameState = 2;
    game.movesAvailable = move.slice(1);
    game.chosenPiece = move[0];
    instructionMessage.textContent = `Where would you like to move? \r\n Press button to select another piece.`;
    actionButton.textContent = 'Go Back'
    actionButton.removeEventListener("click", stateFour);
    actionButton.addEventListener("click", stateOne);
    boardRefresh();
};

const stateThree = () => {
    game.gameState = 3;
    instructionMessage.textContent = `Press button to end turn.`;
    actionButton.textContent = 'End Turn'
    actionButton.removeEventListener("click", stateOne);
    actionButton.addEventListener("click", changePlayers);
};

const stateFour = () => {
    let quitter = window.confirm("Are you sure?");
    if (quitter){
        game.gameState = 4;
        let endCondition = `conceding. There were moves availble. \r\n It is wise to know your limitations, and folly not to push the envelope.\r\n Reload to play again.`
        if (inCheckMate()) endCondition = 'checkmate. Good game!'
        if (inStaleMate()) endCondition = '....hunh?  played to a draw?  Not to worry... Any time at the chessboard is time well spent!'
        instructionMessage.textContent = `${game.colorPlaying} player lost by ${endCondition}`;
        actionButton.style.visibility = "hidden"; 
    }
  };

export { stateOne, stateTwo, stateThree, stateFour }
