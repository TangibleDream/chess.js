'use strict';
import { boardRefresh, changePlayers, pawnPromotion } from './helpers.js';
import pieces from './pieces.js'
import { stateOne, stateFour } from './state.js'

const game = {
  pieces,
  gameState: 0,
  colorPlaying: 'White',
  moveAvailable: [],
  chosenPiece: -1,
  check: false,
  shortCastleWhite: true,
  longCastleWhite: true,
  shortCastleBlack: true,
  longCastleBlack: true,
  threats: [],
  threatPath: [],
  threatLoc: [],
  get getPieces() {
    return this.pieces;
  },
  set setDestination(pdArr) {
    this.pieces[pdArr[0]].position = pdArr[1];
  },
  set setPiece(pArr) {
    this.pieces[pArr[0]].piece = pArr[1];
  }
};

let chessGame = game;
boardRefresh(chessGame);
const actionButton = document.getElementById('actionButton');
const instructionMessage = document.getElementById('instructionMessage');
const promotionForm = document.getElementById('promotionOption');
const promotionBound = pawnPromotion.bind(null, chessGame, promotionForm);
promotionForm.addEventListener("change", promotionBound);
instructionMessage.textContent = 'Press start to play.';
const stateOneBound = stateOne.bind(null, chessGame);
const stateFourBound = stateFour.bind(null, chessGame);
const changePlayersBound = changePlayers.bind(null, chessGame);
actionButton.addEventListener("click", stateOneBound);

export { boardRefresh, changePlayersBound, promotionForm, stateOneBound, stateFourBound }
