'use strict';
import { squareColor, piecesJSON, getY, getX } from './helpers.js';

const boardRefresh = (chessGame) => {
    let pieces = JSON.parse(piecesJSON());
    let squares = [];
    let anchorElement = [];
    let addAnchor = false;
    let pieceNum = -1;
    let element = document.getElementById('chessBoard');
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    for (let i = 0; i < 64; i ++){
        addAnchor = false;
        squares[i] = document.createElement("img");
        pieceNum = piecePresent(i);
        if (pieceNum > -1){
          addAnchor = true;
          switch (pieces.pieces[pieceNum].piece){
            case 'White King' :
              squareColor(i) === "black" ? squares[i].src = "images\\wkingbbkgr.png" : squares[i].src = "images\\wkingwbkgr.png";
              break;
            case 'White Queen' :
              squareColor(i) === "black" ? squares[i].src = "images\\wquenbbkgr.png" : squares[i].src = "images\\wquenwbkgr.png";
              break;
            case 'White King Bishop' :
            case 'White Queen Bishop' :
              squareColor(i) === "black" ? squares[i].src = "images\\wbishopbbkgr.png" : squares[i].src = "images\\wbishopwbkgr.png";
              break;
            case 'White King Knight' :
            case 'White Queen Knight' :
              squareColor(i) === "black" ? squares[i].src = "images\\wknightbbkgr.png" : squares[i].src = "images\\wknightwbkgr.png";
              break;
            case 'White King Rook' :
            case 'White Queen Rook' :
               squareColor(i) === "black" ? squares[i].src = "images\\wrookbbkgr.png" : squares[i].src = "images\\wrookwbkgr.png";
               break;
            case 'White Pawn One' :
            case 'White Pawn Two' :
            case 'White Pawn Three' :
            case 'White Pawn Four' :
            case 'White Pawn Five' :
            case 'White Pawn Six' :
            case 'White Pawn Seven' :
            case 'White Pawn Eight' :
              squareColor(i) === "black" ? squares[i].src = "images\\wpwnbbkgr.png" : squares[i].src = "images\\wpwnwbkgr.png";
              break;
            case 'Black King' :
              squareColor(i) === "black" ? squares[i].src = "images\\bkingbbkgr.png" : squares[i].src = "images\\bkingwbkgr.png";
              break;
            case 'Black Queen' :
              squareColor(i) === "black" ? squares[i].src = "images\\bquenbbkgr.png" : squares[i].src = "images\\bquenwbkgr.png";
              break;
            case 'Black King Bishop' :
            case 'Black Queen Bishop' :
              squareColor(i) === "black" ? squares[i].src = "images\\bbishopbbkgr.png" : squares[i].src = "images\\bbishopwbkgr.png";
              break;
            case 'Black King Knight' :
            case 'Black Queen Knight' :
              squareColor(i) === "black" ? squares[i].src = "images\\bknightbbkgr.png" : squares[i].src = "images\\bknightwbkgr.png";
              break;
            case 'Black King Rook' :
            case 'Black Queen Rook' :
               squareColor(i) === "black" ? squares[i].src = "images\\brookbbkgr.png" : squares[i].src = "images\\brookwbkgr.png";
               break;
            case 'Black Pawn One' :
            case 'Black Pawn Two' :
            case 'Black Pawn Three' :
            case 'Black Pawn Four' :
            case 'Black Pawn Five' :
            case 'Black Pawn Six' :
            case 'Black Pawn Seven' :
            case 'Black Pawn Eight' :
              squareColor(i) === "black" ? squares[i].src = "images\\bpwnbbkgr.png" : squares[i].src = "images\\bpwnwbkgr.png";
              break;
          }
        } else {
          squareColor(i) === "black" ? squares[i].src = "images\\bbkgr.png" : squares[i].src = "images\\wbkgr.png";
        }
        if (addAnchor) {
            anchorElement[i] = document.createElement('a');
            anchorElement[i].id = `${i}`;
            anchorElement[i].href = '#';
            element.appendChild(anchorElement[i]);
            document.getElementById(`${i}`).addEventListener("click", function(e) { movePiece(this.id, chessGame) });
            document.getElementById(`${i}`).appendChild(squares[i]);
        } else {
            element.appendChild(squares[i]);
        }
        if (((i+1) % 8 === 0) && (i < 60))
        {
          element.appendChild(document.createElement('br'));
        };
    };
};

const compassRose = () => {
  let Object = {
    result: [],
    get getResult() { return this.result; },
    set setResult(result) { this.result.push(result); },
    set setResultInc(result) {
      this.result.push(result);
      this.moves++;
    },
    moves: 0,
    get getMoves() { return this.moves; },
    get incMoves() { this.moves++; },
    location: 0,
    get getLocation() { return this.location; },
    set setLocation(location) { this.location = location; },
    noMoreMoves: false,
    get getNoMoreMoves() { return this.noMoreMoves; },
    set setNoMoreMoves(nMMBool) { this.noMoreMoves = nMMBool; }
  }
  return(Object);
}

const east = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position + (1 * (cr.getMoves + 1)));
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = pieces.pieces[id].position + (1 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position + (1 * (cr.getMoves + 1)) > 63 || getX(pieces.pieces[id].position + (1 * (cr.getMoves + 1))) === 1 ) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

const game = {
  gameState: 0,
  colorPlaying: 'White',

  get getGameState() {
    return this.gameState;
  },
  get getColorPlaying() {
    return this.colorPlaying;
  },
  set setGameState(state) {
    this.gameState = state;
  },
  set setColorPlaying(color) {
    this.colorPlaying = color;
  }
}

const movePiece = (id,chessGame) => {
  let pieces = JSON.parse(piecesJSON());
  for (let i = 0; i < 32; i ++){
    if (pieces.pieces[i].position === parseInt(id)){
      switch(chessGame.getGameState) {
        case 0:
          alert(`This piece is ${pieces.pieces[i].piece}`);
        break;
        case 1:
          if(pieces.pieces[i].piece.charAt(0) != chessGame.getColorPlaying.charAt(0)){
            document.getElementById('instructionMessage').setAttribute('style', 'white-space: pre;');
            document.getElementById('instructionMessage').textContent = `This is not a ${chessGame.getColorPlaying.toLowerCase()} player piece. \r\n Select your own color piece.`;
          } else {
            let move = moves(i,chessGame);
            document.getElementById('instructionMessage').setAttribute('style', 'white-space: pre;');
            if (isNaN(move[0])) { document.getElementById('instructionMessage').textContent = `You are blocked (${move}) \r\n Select a different piece.`; }
            else { document.getElementById('instructionMessage').textContent = `Where would you like to move? (${move})`; }
          }
        break;
      }
    }
  }
};

const moves = (id,chessGame) => {
  let pieces = JSON.parse(piecesJSON());
  let result = [];
  let nm = [];
  let sm = [];
  let em = [];
  let wm = [];
  let nwm = [];
  let nem = [];
  let sem = [];
  let swm = [];
  switch (pieces.pieces[id].piece) {
    case "White King Rook" :
    case "Black King Rook" :
    case "White Queen Rook" :
    case "Black Queen Rook" :
    {
      if (getY(pieces.pieces[id].position) > 1) { nm = north(id,chessGame)};
      if (getY(pieces.pieces[id].position) < 8) { sm = south(id,chessGame)};
      if (getX(pieces.pieces[id].position) < 8) { em = east(id,chessGame)};
      if (getX(pieces.pieces[id].position) > 1) { wm = west(id,chessGame)};
      let blocked = true;
      if (Number.isInteger(nm[0]) || Number.isInteger(sm[0]) || Number.isInteger(em[0]) || Number.isInteger(wm[0])) blocked = false;
      if (blocked === false){
        result.push(id);
        if (Number.isInteger(nm[0])) result = result.concat(nm);
        if (Number.isInteger(sm[0])) result = result.concat(sm);
        if (Number.isInteger(em[0])) result = result.concat(em);
        if (Number.isInteger(wm[0])) result = result.concat(wm);
      }else{
        if (isNaN(nm[0])) result = result.concat(nm);
        if (isNaN(sm[0])) result = result.concat(sm);
        if (isNaN(em[0])) result = result.concat(em);
        if (isNaN(wm[0])) result = result.concat(wm);
      }
    }
    break;
    case "White King Bishop" :
    case "Black King Bishop" :
    case "White Queen Bishop" :
    case "Black Queen Bishop" :
    {
      if (getY(pieces.pieces[id].position) > 1 && getX(pieces.pieces[id].position) > 1) { nwm = northWest(id,chessGame)};
      if (getY(pieces.pieces[id].position) > 1 && getX(pieces.pieces[id].position) < 8) { nem = northEast(id,chessGame)};
      if (getY(pieces.pieces[id].position) < 8 && getX(pieces.pieces[id].position) < 8) { sem = southEast(id,chessGame)};
      if (getY(pieces.pieces[id].position) < 8 && getX(pieces.pieces[id].position) > 1) { swm = southWest(id,chessGame)};
        let blocked = true;
        if (Number.isInteger(nwm[0]) || Number.isInteger(nem[0]) || Number.isInteger(sem[0]) || Number.isInteger(swm[0])) blocked = false;
        if (blocked === false){
          result.push(id);
          if (Number.isInteger(nwm[0])) result = result.concat(nwm);
          if (Number.isInteger(nem[0])) result = result.concat(nem);
          if (Number.isInteger(sem[0])) result = result.concat(sem);
          if (Number.isInteger(swm[0])) result = result.concat(swm);
        } else{
          if (isNaN(nwm[0])) result = result.concat(nwm);
          if (isNaN(nem[0])) result = result.concat(nem);
          if (isNaN(sem[0])) result = result.concat(sem);
          if (isNaN(swm[0])) result = result.concat(swm);
        }
    }
    break;
    case "White Queen" :
    case "Black Queen" :
    {
      if (getY(pieces.pieces[id].position) > 1) { nm = north(id,chessGame)};
      if (getY(pieces.pieces[id].position) < 8) { sm = south(id,chessGame)};
      if (getX(pieces.pieces[id].position) < 8) { em = east(id,chessGame)};
      if (getX(pieces.pieces[id].position) > 1) { wm = west(id,chessGame)};
      if (getY(pieces.pieces[id].position) > 1 && getX(pieces.pieces[id].position) > 1) { nwm = northWest(id,chessGame)};
      if (getY(pieces.pieces[id].position) > 1 && getX(pieces.pieces[id].position) < 8) { nem = northEast(id,chessGame)};
      if (getY(pieces.pieces[id].position) < 8 && getX(pieces.pieces[id].position) < 8) { sem = southEast(id,chessGame)};
      if (getY(pieces.pieces[id].position) < 8 && getX(pieces.pieces[id].position) > 1) { swm = southWest(id,chessGame)};
        let blocked = true;
        if (Number.isInteger(nm[0]) || Number.isInteger(sm[0]) || Number.isInteger(em[0]) || Number.isInteger(wm[0]) ||
        Number.isInteger(nwm[0]) || Number.isInteger(nem[0]) || Number.isInteger(sem[0]) || Number.isInteger(swm[0])) blocked = false;
        if (blocked === false){
          result.push(id);
          if (Number.isInteger(nm[0])) result = result.concat(nm);
          if (Number.isInteger(sm[0])) result = result.concat(sm);
          if (Number.isInteger(em[0])) result = result.concat(em);
          if (Number.isInteger(wm[0])) result = result.concat(wm);
          if (Number.isInteger(nwm[0])) result = result.concat(nwm);
          if (Number.isInteger(nem[0])) result = result.concat(nem);
          if (Number.isInteger(sem[0])) result = result.concat(sem);
          if (Number.isInteger(swm[0])) result = result.concat(swm);
        } else{
          if (isNaN(nm[0])) result = result.concat(nm);
          if (isNaN(sm[0])) result = result.concat(sm);
          if (isNaN(em[0])) result = result.concat(em);
          if (isNaN(wm[0])) result = result.concat(wm);
          if (isNaN(nwm[0])) result = result.concat(nwm);
          if (isNaN(nem[0])) result = result.concat(nem);
          if (isNaN(sem[0])) result = result.concat(sem);
          if (isNaN(swm[0])) result = result.concat(swm);
        }
    }
    break;
  }
  return result;
}

const north = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position - (8 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else {  cr.setResultInc = pieces.pieces[id].position - (8 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position - (8 * (cr.getMoves + 1)) < 0) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

const northEast = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position - (7 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = pieces.pieces[id].position - (7 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position - (7 * (cr.getMoves + 1)) < 0  || getX(pieces.pieces[id].position - (7 * (cr.getMoves + 1))) === 1) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

const northWest = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position - (9 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = pieces.pieces[id].position - (9 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position - (9 * (cr.getMoves + 1)) < 0 || getX(pieces.pieces[id].position - (9 * (cr.getMoves + 1))) === 8) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

const piecePresent = (num) => {
    let pieces = JSON.parse(piecesJSON());
    let result = -1;
    for (let i = 0; i < 32; i ++){
        if (pieces.pieces[i].position === num)
        {
          result = i;
        }
    }
    return result
}

const south = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position + (8 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = pieces.pieces[id].position + (8 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position + (8 * (cr.getMoves + 1)) > 63) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

const southEast = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position + (9 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = pieces.pieces[id].position + (9 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position + (9 * (cr.getMoves + 1)) > 63  || getX(pieces.pieces[id].position + (9 * (cr.getMoves + 1))) === 1) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

const southWest = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position + (7 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = pieces.pieces[id].position + (7 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position + (7 * (cr.getMoves + 1)) > 63  || getX(pieces.pieces[id].position + (7 * (cr.getMoves + 1))) === 8) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

const stateOne = (chessGame) => {
  chessGame.setGameState = 1;
  document.getElementById('instructionMessage').textContent = 'What piece would you like to move?  Press button to end game'
  document.getElementById('actionButton').textContent = 'Concede Game'
  document.getElementById('actionButton').addEventListener("click", function(e) { stateFour(chessGame.getColorPlaying) });
}

const stateFour = (player) => {
  chessGame.setGameState = 4;
  document.getElementById('instructionMessage').setAttribute('style', 'white-space: pre;');
  document.getElementById('instructionMessage').textContent = `${player} player lost by conceding. \r\n It is wise to know your limitations, and folly not to push the envelope.\r\n Reload to play again.`;
  document.getElementById('actionButton').style.visibility = "hidden";
}

const west = (id,chessGame) => {
  let cr = compassRose();
  let pieces = JSON.parse(piecesJSON());
  while (cr.getNoMoreMoves === false){
    cr.setLocation = piecePresent(pieces.pieces[id].position - (1 * (cr.getMoves + 1)))
    if (cr.getLocation != -1) {
      if (cr.getMoves === 0){ cr.setResult = pieces.pieces[cr.getLocation].piece; }
      cr.setNoMoreMoves = true;
    } else { cr.setResultInc = pieces.pieces[id].position - (1 * (cr.getMoves + 1)); }
    if (pieces.pieces[id].position - (1 * (cr.getMoves + 1)) < 0 || getX(pieces.pieces[id].position - (1 * (cr.getMoves + 1))) === 8 ) cr.setNoMoreMoves = true;
  }
  return cr.getResult;
}

let chessGame = game;
boardRefresh(chessGame);
document.getElementById('instructionMessage').textContent = 'Press start to play.';
document.getElementById('actionButton').addEventListener("click", stateOne.bind(null, chessGame));
