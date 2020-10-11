'use strict';
import { boardRefresh, changePlayersBound, stateOneBound, stateFourBound } from './game.js'
import { inCheck, inCheckMate, inStaleMate } from './helpers.js'

const stateOne = (chessGame) => {
    chessGame.setGameState = 1;
    boardRefresh(chessGame);
    let instructionMessage = '';
    if (inCheck(chessGame)) {
      chessGame.setCheck = true;
      instructionMessage = 'You are in check!!!\r\n'
    }
    instructionMessage += 'What piece would you like to move?  Press button to end game';
    document.getElementById('instructionMessage').setAttribute('style', 'white-space: pre;');
    document.getElementById('instructionMessage').textContent = instructionMessage
    actionButton.textContent = 'Concede Game'
    actionButton.removeEventListener("click", stateOneBound);
    actionButton.removeEventListener("click", changePlayersBound);
    actionButton.addEventListener("click", stateFourBound);
};

const stateTwo = (move, chessGame) => {
    chessGame.setGameState = 2;
    chessGame.setMovesAvailable = move.slice(1);
    chessGame.setChosenPiece = move[0];
    instructionMessage.textContent = `Where would you like to move? \r\n Press button to select another piece.`;
    actionButton.textContent = 'Go Back'
    actionButton.removeEventListener("click", stateFourBound);
    actionButton.addEventListener("click", stateOneBound);
    boardRefresh(chessGame);
};

const stateThree = (chessGame) => {
    chessGame.setGameState = 3;
    instructionMessage.textContent = `Press button to end turn.`;
    actionButton.textContent = 'End Turn'
    actionButton.removeEventListener("click", stateOneBound);
    actionButton.addEventListener("click", changePlayersBound);
};

const stateFour = (chessGame) => {
    let quitter = window.confirm("Are you sure?");
    if (quitter){
        chessGame.setGameState = 4;
        let endCondition = `conceding. There were moves availble. \r\n It is wise to know your limitations, and folly not to push the envelope.\r\n Reload to play again.`
        if (inCheckMate(chessGame)) endCondition = 'checkmate. Good game!'
        if (inStaleMate(chessGame)) endCondition = '....hunh?  played to a draw?  Not to worry... Any time at the chessboard is time well spent!'
        instructionMessage.textContent = `${chessGame.getColorPlaying} player lost by ${endCondition}`;
        actionButton.style.visibility = "hidden"; 
    }
  };


export { stateOne, stateTwo, stateThree, stateFour }
