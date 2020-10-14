'use strict';
import { boardRefresh, changePlayers, dataPull, pawnPromotion, specialMenuToggle } from './helpers.js';
import pieces from './pieces.js'
import { stateOne } from './state.js'

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

boardRefresh();
;
const promotionForm = document.getElementById('promotionOption');
const promotionBound = pawnPromotion.bind(null, promotionForm);
promotionForm.addEventListener("change", promotionBound);
document.getElementById('instructionMessage').textContent = 'Press start to play.';
document.getElementById('actionButton').addEventListener("click", stateOne);
document.getElementById('dataSpout').addEventListener("click", dataPull);
document.getElementById('specialMenu').addEventListener("change", specialMenuToggle);
document.getElementById('players').addEventListener("click", changePlayers);

export { game, promotionForm }
