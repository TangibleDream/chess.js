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
  get getThreatLoc() {
    return this.threatLoc
  },
  get getThreatPath() {
    return this.threatPath;
  },
  get getThreats() {
    return this.threats;
  },
  get getShortCastleWhite() {
    return this.shortCastleWhite;
  },
  get getLongCastleWhite() {
    return this.longCastleWhite;
  },
  get getShortCastleBlack() {
    return this.shortCastleBlack;
  },
  get getLongCastleBlack() {
    return this.longCastleBlack;
  },
  get getCheck() {
    return this.check;
  },
  get getPieces() {
    return this.pieces;
  },
  get getGameState() {
    return this.gameState;
  },
  get getColorPlaying() {
    return this.colorPlaying;
  },
  get getMovesAvailable() {
    return this.moveAvailable;
  },
  get getChosenPiece() {
    return this.chosenPiece;
  },
  set setThreatLoc(tlArr) {
    this.threatLoc = tlArr;
  },
  set setThreatPath(threatPathArray) {
    this.threatPath = threatPathArray;
  },
  set setThreats(threatArray) {
    this.threats = threatArray;
  },
  set setShortCastleWhite(castleBool) {
    this.shortCastleWhite = castleBool;
  },
  set setLongCastleWhite(castleBool) {
    this.longCastleWhite = castleBool;
  },
  set setShortCastleBlack(castleBool) {
    this.shortCastleBlack = castleBool;
  },
  set setLongCastleBlack(castleBool) {
    this.longCastleBlack = castleBool;
  },
  set setCheck(checkBool) {
    this.check = checkBool;
  },
  set setGameState(state) {
    this.gameState = state;
  },
  set setColorPlaying(color) {
    this.colorPlaying = color;
  },
  set setMovesAvailable(moves) {
    this.moveAvailable = moves;
  },
  set setChosenPiece(pieceLocation) {
    this.chosenPiece = pieceLocation;
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
