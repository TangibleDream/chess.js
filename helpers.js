'use strict';
import { checkKnightX, checkKnightY, clearParent, findSquare, flipValue, offset, getX, getY, squareColor } from "./util.js";
import { stateOne, stateTwo, stateThree } from './state.js'
import { game, promotionForm } from './game.js'

const addTrophies = (tArr) => {
  let top = document.getElementById('topTrophyCase');
  let bottom = document.getElementById('bottomTrophyCase');
  let trophies = []
  let tCount = 0
  let images = {0:'wking', 1:'bking',2:'wquen', 3:'bquen',4:'wbishop', 5:'bbishop',6:'wbishop', 7:'bbishop',
                8:'wknight', 9:'bknight',10:'wknight', 11:'bknight',12:'wrook', 13:'brook',14:'wrook', 15:'brook',
                16:'wpwn', 17:'wpwn',18:'wpwn', 19:'wpwn',20:'wpwn', 21:'wpwn',22:'wpwn', 23:'wpwn',
                24:'bpwn', 25:'bpwn',26:'bpwn', 27:'bpwn',28:'bpwn', 29:'bpwn',30:'bpwn', 31:'bpwn'}
  tArr.forEach(item => {
    trophies[tCount] = document.createElement('img');
    trophies[tCount].src = `./images/${images[item]}wbkgr.png`;
    trophies[tCount].style.width = "1%";
    tCount++
  })
  trophies.forEach(item => {
    if (game.colorPlaying === 'White') {
      if(item.src.charAt(29) === 'w'){ //will change with server and filepath
        top.appendChild(item);
      }
      else { bottom.appendChild(item); }
    }
    else {
      if(item.src.charAt(29) === 'w'){ bottom.appendChild(item); }
      else { top.appendChild(item); }
    }
  })
}

const blockSet = () => {
  let result = [];
  let myMoves = [];
  let addPiece = false;
  myPieces().forEach(item => {
    addPiece = false;
    myMoves = moves(item);
    myMoves.shift();
    myMoves.forEach(item => {
      game.threatPath.includes(item) ? addPiece = true : addPiece = addPiece;
    })
    if (addPiece === true) result = result.concat(item);
  })
  result.shift();
  return result;
} 

const blockThreat = () => {
  inCheck()
  let result = false;
  if (game.threatPath.length > 0){
    let adjacent = false
    game.threats.forEach(item => {
      if (['wn','ng','ht'].includes(item.slice(item.length - 2))) adjacent = true;
    })
    if (adjacent === false) {
      blockSet().forEach(item => {
        if (moveAwayFromThreat(item) === true) result = true;
      })
    }
  }
  return result;
}

const boardRefresh = () => {
    let squares = [];
    let anchorElement = [];
    let addAnchor = false;
    let pieceNum = -1;
    let element = document.getElementById('chessBoard');
    let images = {'White King' : ["images\\wkingbbkgr.png","images\\wkingwbkgr.png"], 'White Queen' : ["images\\wquenbbkgr.png", "images\\wquenwbkgr.png"], 'White King Bishop' : ["images\\wbishopbbkgr.png", "images\\wbishopwbkgr.png"], 'White Queen Bishop' : ["images\\wbishopbbkgr.png", "images\\wbishopwbkgr.png"],
                  'White King Knight' : ["images\\wknightbbkgr.png","images\\wknightwbkgr.png"],'White Queen Knight' : ["images\\wknightbbkgr.png","images\\wknightwbkgr.png"],'White King Rook' : ["images\\wrookbbkgr.png","images\\wrookwbkgr.png"],'White Queen Rook' : ["images\\wrookbbkgr.png","images\\wrookwbkgr.png"],'White Pawn':["images\\wpwnbbkgr.png","images\\wpwnwbkgr.png"],
                  'Black King' : ["images\\bkingbbkgr.png","images\\bkingwbkgr.png"], 'Black Queen' : ["images\\bquenbbkgr.png", "images\\bquenwbkgr.png"], 'Black King Bishop' : ["images\\bbishopbbkgr.png", "images\\bbishopwbkgr.png"], 'Black Queen Bishop' : ["images\\bbishopbbkgr.png", "images\\bbishopwbkgr.png"],
                  'Black King Knight' : ["images\\bknightbbkgr.png","images\\bknightwbkgr.png"],'Black Queen Knight' : ["images\\bknightbbkgr.png","images\\bknightwbkgr.png"],'Black King Rook' : ["images\\brookbbkgr.png","images\\brookwbkgr.png"],'Black Queen Rook' : ["images\\brookbbkgr.png","images\\brookwbkgr.png"],'Black Pawn':["images\\bpwnbbkgr.png","images\\bpwnwbkgr.png"]}

    clearParent('chessBoard');

    for (let i = 0; i < 64; i ++){
        addAnchor = false;
        squares[i] = document.createElement("img");
        pieceNum = piecePresent(i);
        if (pieceNum > -1){
          addAnchor = true;
          squares[i].src = images[game.getPieces[pieceNum].piece][squareColor(i) === "black" ? 0 : 1]
        } else {
          if (game.gameState === 2)  addAnchor = true;
          squareColor(i) === "black" ? squares[i].src = "images\\bbkgr.png" : squares[i].src = "images\\wbkgr.png";
        }
        if (addAnchor) {
            anchorElement[i] = document.createElement('a');
            anchorElement[i].id = `${i}`;
            anchorElement[i].href = '#';
            element.appendChild(anchorElement[i]);
            document.getElementById(`${i}`).appendChild(squares[i]);
        } else {
            element.appendChild(squares[i]);
        }
        if (((i+1) % 8 === 0) && (i < 60)) element.appendChild(document.createElement('br'));
    };
    if (game.gameState === 0) element.addEventListener("click", function(e) { if(findSquare(e) != -1 ) squareHub(findSquare(e))});
  trophyRefresh();
};

const captureThreat = () => {
  inCheck();
  let result = false;
  let myMoves = [];
  let captureSet = [];
  let curLoc = - 1;
  let curThreatId = threatId()
  let curThreatLoc = game.threatLoc[0]
  if (game.threatLoc.length === 1){
    myPieces().forEach(item => {
      myMoves = moves(item);
      myMoves.shift();
      if (myMoves.includes(game.threatLoc[0])) captureSet = captureSet.concat(item);
    });
  }
  captureSet.forEach(item => {
    curLoc = game.getPieces[item].position;
    game.setDestination = [curThreatId, -1];
    game.setDestination = [item, curThreatLoc];
    if (inCheck() === false) result = true;
    game.setDestination = [curThreatId, curThreatLoc];
    game.setDestination = [item, curLoc]
  })
  return result;
}

const castle = (type) => {
  let kinko = {'short' : [[0,62],[1,57]],'long' : [[0,58],[1,61]]};
  let castleGo = window.confirm("Would you like to castle?");
  if (castleGo) {
    let kingLoc = (game.colorPlaying === 'White' ? 0 : 1);
    game.setDestination = (game.colorPlaying === 'White' ? kinko[type][0] : kinko[type][1]);
    if (kingLoc === 0){
      game.shortCastleWhite = false;
      game.longCastleWhite = false;
    } else {
      game.shortCastleBlack = false;
      game.longCastleBlack = false;
    }
  }
}

const changePlayers = () => {
  (game.colorPlaying === 'White' ? game.colorPlaying = 'Black' : game.colorPlaying = 'White');
  for(let i = 0; i < 32; i ++) {
    if (game.getPieces[i].position != -1) game.setDestination = [i, flipValue(game.getPieces[i].position)];
  }
  stateOne();
};

const checkCastle = (pc, id) => {
  let result = 'none';
  let king = -1;
  let kingLoc = -1;
  game.colorPlaying === 'White' ? king = 0 : king = 1;
  kingLoc = game.getPieces[king].position;
  let castles = {'White King Rook' : [61, game.shortCastleWhite, [61,62]], 'Black King Rook': [58,game.shortCastleBlack, [58,57]], 'White Queen Rook' : [59,game.longCastleWhite, [59,58]], 'Black Queen Rook': [60,game.longCastleBlack, [60,61]]}
  id = parseInt(id);
  if(pc in castles){
    let cc = false
    castles[pc][2].forEach(item => { 
      game.setDestination = [king, item]
      if (inCheck()) cc = true;
    });
    game.setDestination = [king, kingLoc]
    if (cc === false){
      if([61,58].includes(id) && castles[pc][1] === true) result = 'short';
      if([59,60].includes(id) && castles[pc][1] === true) result = 'long';
    }
  }
  return result
}

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
    noMoreMoves: false
  }
  return(Object);
};

const dataPull = () => {
  let result = "export default [\r\n"
  for(let i = 0;i<32;i++){
    result += `  {\r\n    "piece":"${game.pieces[i].piece}",\r\n    "position":${game.pieces[i].position}\r\n  },\r\n`
  }
  result = result.slice(0, -3);
  result += "\r\n]"
  document.getElementById('dataMessage').setAttribute('style', 'white-space: pre;');
  document.getElementById('dataMessage').textContent = result;
}

const directional = (direction, id, isPawn = false) => {
  let dmap = {'east' : ['pos',1,['en','ok'],['ng'],1], 'west' : ['neg',1,['en','ok'],['ng'],8], 'south' : ['pos',8,['en','ok'],['ng'],8]
  , 'southeast' : ['pos',9,['en','op'],['ng'],1] , 'southwest' : ['pos',7,['en','op'],['ng'],8], 'north' : ['neg',8,['en','ok'],['ng'],8],
  'northeast' : ['neg',7,['en','op'],['wn','ng'],1], 'northwest' : ['neg',9,['en','op'],['wn','ng'],8]}
  let cr = compassRose();
  while (cr.noMoreMoves === false){
    cr.location = piecePresent(game.getPieces[id].position + offset(dmap[direction][1],cr.getMoves,dmap[direction][0]));
    if (cr.location != -1) {
      if (isOpponent(cr.location)) {
        if (isThreat(dmap[direction][2], dmap[direction][3], pieceCode(cr.location), id, cr.getMoves)) {
          game.check = true;
          game.threatPath = game.threatPath.concat(cr.getResult);
          game.threats = game.threats.concat(game.getPieces[cr.location].piece);
          game.threatLoc = game.threatLoc.concat(game.getPieces[cr.location].position);
        }
        if (isPawn === false || (isPawn && ['northeast','northwest'].includes(direction))){
          cr.setResultInc = game.getPieces[id].position + offset(dmap[direction][1],cr.getMoves,dmap[direction][0]);
          cr.noMoreMoves = true;
        }
      }
      if (cr.getMoves === 0){ cr.setResult = game.getPieces[cr.location].piece; }
      cr.noMoreMoves = true;
    } else { 
      if ((isPawn && ['northeast','northwest'].includes(direction)) === false) { 
        cr.setResultInc = game.getPieces[id].position + offset(dmap[direction][1],cr.getMoves,dmap[direction][0]);
      } else
      { cr.noMoreMoves = true; }   
    }
    if (['east', 'south', 'southeast', 'southwest'].includes(direction)) {
      if (game.getPieces[id].position + offset(dmap[direction][1],cr.getMoves,dmap[direction][0]) > 63) cr.noMoreMoves = true;
    }
    if (['west', 'north', 'northeast', 'northwest'].includes(direction)) {
      if (game.getPieces[id].position + offset(dmap[direction][1],cr.getMoves,dmap[direction][0])  < 0) cr.noMoreMoves = true;
    }
    if (['east', 'west', 'southeast', 'southwest', 'northeast', 'northwest'].includes(direction)) {
      if (getX(game.getPieces[id].position + offset(dmap[direction][1],cr.getMoves,dmap[direction][0])) === dmap[direction][4] ) cr.noMoreMoves = true;
    }
  }
  return cr.getResult;
}

const inCheck = () => {
  let result = false;
  let threats = [];
  let kingLoc = -1;
  game.check = false;
  game.threatPath = [];
  game.threats = [];
  game.threatLoc = [];
  (game.colorPlaying === 'White' ? kingLoc = 0 : kingLoc = 1);
  let KPos = game.getPieces[kingLoc].position;
  if (getX(KPos) != 8) { directional('east',kingLoc); }
  if (getX(KPos) != 1) { directional('west',kingLoc); }
  if (getY(KPos) != 8) { directional('south',kingLoc); }
  if (getY(KPos) != 1) { directional('north',kingLoc); }
  if (getX(KPos) != 8 && getY(KPos) != 8) { directional('southeast',kingLoc); }
  if (getX(KPos) != 1 && getY(KPos) != 1) { directional('northwest',kingLoc); }
  if (getX(KPos) != 1 && getY(KPos) != 8) { directional('southwest',kingLoc); }
  if (getX(KPos) != 8 && getY(KPos) != 1) { directional('northeast',kingLoc); }
  knightMoves(kingLoc);
  if (game.check) result = true;
  return result;
}

const inCheckMate = () => {
  return (inCheck() && moveAwayFromThreat() === false && blockThreat() === false && captureThreat() === false);
}

const inStaleMate = () => {
  let myMoves = [];
  let result = false;
  if (inCheck() === false && moveAwayFromThreat() === false) {
      let result = true; 
      myPieces().forEach(item => {        
       if (moveAwayFromThreat(item) === true) result = false;       
      })
    }
  return result;
}

const invalidMove = (pc) => {
  let pm = "";
  (pc === 'wn' && [48,49,50,51,52,53,54,55].includes(game.getPieces[game.chosenPiece].position)) ? pm = '2 spaces' : '1 space';
  let helpfulMessages = {'wn':`This pawn can move ${pm} and capture diagonally 1 space where possible. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`,
                         'ok':'A rook can move vertically and horizontally where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.',
                         'ht':'A knight can move in a 1-2 or 2-1 L pattern. Either select a valid square or \r\n Press \'go back\' and Select a different piece.',
                         'op':`A bishop can move diagonally where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.`,
                         'en':'A Queen can move vertically, horizontally, and diagonally where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.',
                         'ng':'A King can move vertically, horizontally, and diagonally 1 space  where not blocked. Either select a valid square or \r\n Press \'go back\' and Select a different piece.'
                        }
  instructionMessage.textContent = helpfulMessages[pc];
}

const isOpponent = (pNum) => { return (game.getPieces[pNum].piece.charAt(0) != game.colorPlaying.charAt(0)) }

const isThreat = (disArr, adjArr, ePiece, mPiece, moves) => {
  let result = false
  if ((disArr.includes(ePiece) && [0,1].includes(mPiece)) || (adjArr.includes(ePiece) && moves === 0)) {
    result = true;
  }
  return result
}

const knightMoves = (id) => {
  let mathSet= new Set([-17,-15,-10,-6,6,10,15,17])
  checkKnightX(game.getPieces[id].position).forEach(item => {mathSet.delete(item)});
  checkKnightY(game.getPieces[id].position).forEach(item => {mathSet.delete(item)});
  let position = -1
  let result = [id]
  for (let correction of mathSet){
    position = game.getPieces[id].position + correction
    if (piecePresent(position) === -1  ) {result = result.concat(position);}
    else {
      if (game.getPieces[piecePresent(position)].piece.charAt(0) != game.colorPlaying.charAt(0)) {
        if (pieceCode(piecePresent(position)) === 'ht') {
          game.check = true;
          game.threats = game.threats.concat(game.getPieces[piecePresent(position)].piece);
          game.threatLoc = game.threatLoc.concat(game.getPieces[piecePresent(position)].position);
        }
        result = result.concat(position);
      }
    }
  }
  return result;
}

const moveAwayFromThreat = (bp = -1) => {
  let result = false;
  let testKing = (game.colorPlaying === 'White' ? 0 : 1);
  if (bp > -1) testKing = bp;
  let kingLoc = game.getPieces[testKing].position;
  let myMoves = moves(testKing);
  if(Number.isInteger(myMoves[0])){
    myMoves.shift();
    myMoves.forEach(item => {
      game.setDestination = [testKing,item];
      inCheck() === false ? result = true : result = result;
    })
  };
  game.setDestination = [testKing,kingLoc];
  return result;
}

const moves = (id) => {
  let result = [];
  let nm = [];
  let sm = [];
  let em = [];
  let wm = [];
  let nwm = [];
  let nem = [];
  let sem = [];
  let swm = [];
  switch (pieceCode(id)) {
    case "ok" :
    {
      if (getY(game.getPieces[id].position) > 1) { nm = directional('north',id)};
      if (getY(game.getPieces[id].position) < 8) { sm = directional('south',id)};
      if (getX(game.getPieces[id].position) < 8) { em = directional('east',id)};
      if (getX(game.getPieces[id].position) > 1) { wm = directional('west',id)};
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
    case "op" :
    {
      if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) > 1) { nwm = directional('northwest',id)};
      if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) < 8) { nem = directional('northeast',id)};
      if (getY(game.getPieces[id].position) < 8 && getX(game.getPieces[id].position) < 8) { sem = directional('southeast',id)};
      if (getY(game.getPieces[id].position) < 8 && getX(game.getPieces[id].position) > 1) { swm = directional('southwest',id)};
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
    case "en" :
    {
      if (getY(game.getPieces[id].position) > 1) { nm = directional('north',id)};
      if (getY(game.getPieces[id].position) < 8) { sm = directional('south',id)};
      if (getX(game.getPieces[id].position) < 8) { em = directional('east',id)};
      if (getX(game.getPieces[id].position) > 1) { wm = directional('west',id)};
      if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) > 1) { nwm = directional('northwest',id)};
      if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) < 8) { nem = directional('northeast',id)};
      if (getY(game.getPieces[id].position) < 8 && getX(game.getPieces[id].position) < 8) { sem = directional('southeast',id)};
      if (getY(game.getPieces[id].position) < 8 && getX(game.getPieces[id].position) > 1) { swm = directional('southwest',id)};
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
    case "ng" :
    {
        if (getY(game.getPieces[id].position) > 1) { nm = directional('north',id)};
        if (getY(game.getPieces[id].position) < 8) { sm = directional('south',id)};
        if (getX(game.getPieces[id].position) < 8) { em = directional('east',id)};
        if (getX(game.getPieces[id].position) > 1) { wm = directional('west',id)};
        if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) > 1) { nwm = directional('northwest',id)};
        if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) < 8) { nem = directional('northeast',id)};
        if (getY(game.getPieces[id].position) < 8 && getX(game.getPieces[id].position) < 8) { sem = directional('southeast',id)};
        if (getY(game.getPieces[id].position) < 8 && getX(game.getPieces[id].position) > 1) { swm = directional('southwest',id)};
          let blocked = true;
          if (Number.isInteger(nm[0]) || Number.isInteger(sm[0]) || Number.isInteger(em[0]) || Number.isInteger(wm[0]) ||
          Number.isInteger(nwm[0]) || Number.isInteger(nem[0]) || Number.isInteger(sem[0]) || Number.isInteger(swm[0])) blocked = false;
          if (blocked === false){
            result.push(id);
            if (Number.isInteger(nm[0])) result = result.concat(nm[0]);
            if (Number.isInteger(sm[0])) result = result.concat(sm[0]);
            if (Number.isInteger(em[0])) result = result.concat(em[0]);
            if (Number.isInteger(wm[0])) result = result.concat(wm[0]);
            if (Number.isInteger(nwm[0])) result = result.concat(nwm[0]);
            if (Number.isInteger(nem[0])) result = result.concat(nem[0]);
            if (Number.isInteger(sem[0])) result = result.concat(sem[0]);
            if (Number.isInteger(swm[0])) result = result.concat(swm[0]);
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
    case "wn" :
    {
      if (getY(game.getPieces[id].position) > 1) { nm = directional('north',id,true)};
      if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) > 1) { nwm = directional('northwest',id,true)};
      if (getY(game.getPieces[id].position) > 1 && getX(game.getPieces[id].position) < 8) { nem = directional('northeast',id,true)};
      let blocked = true;
      if (Number.isInteger(nm[0]) || Number.isInteger(nem[0]) || Number.isInteger(nwm[0])) blocked = false;
      if (blocked === false){
        result.push(id);
        if ([48,49,50,51,52,53,54,55].includes(game.getPieces[id].position)) {
          if (Number.isInteger(nm[0])) result = result.concat(nm[0], nm[1]);
        }
        else {
          if (Number.isInteger(nm[0])) result = result.concat(nm[0]);}
        if (Number.isInteger(nem[0])) result = result.concat(nem[0]);
        if (Number.isInteger(nwm[0])) result = result.concat(nwm[0]);
      } else { if (isNaN(nm[0])) result = result.concat(nm); }
    }
    break;
    case "ht" :
    {
      result = knightMoves(id);
    }
    break;
  }
  return result;
};

const myPieces = () => {
  let result = []
  for(let i=0;i<32;i++){
    if (game.getPieces[i].piece.charAt(0) === game.colorPlaying.charAt(0) && game.getPieces[i].position != -1) result = result.concat(i); 
  }
  return result
}

const pawnPromotion = (promotionChoice) => {
  game.setPiece = [game.chosenPiece, `${game.colorPlaying} ${promotionChoice.options[promotionForm.selectedIndex].value}`];
  boardRefresh();
  document.getElementById('promotionOption').value='Choose';
  promotionForm.style.visibility = "hidden";
  promotionMessage.style.visibility = "hidden";
  actionButton.style.visibility = "visible";
}

const pieceCode = (pNum, full = false) => {
  let result = (full ? game.getPieces[pNum].piece : game.getPieces[pNum].piece.slice(game.getPieces[pNum].piece.length - 2));
  return result;
}

const piecePresent = (num) => {
  let result = -1;
  for (let i = 0; i < 32; i ++){
      if (game.getPieces[i].position === num) result = i;
  }
  return result
};

const setDestination = (id) => {
  let capture = false;
  let capturePiece = -1;
  for (let i = 0; i < 32; i ++){
    if (game.getPieces[i].position === parseInt(id)){
      capture = true;
      capturePiece = game.getPieces[i];
    }
  }
  if (game.movesAvailable.includes(parseInt(id))) {     //V A L I D   S Q U A R E   L O G I C
    let oldDest = game.getPieces[game.chosenPiece].position;
    let oldCapture = -1
    if (capture === true) {
      oldCapture = capturePiece.position;
      capturePiece.position = -1
    };
    game.setDestination = [game.chosenPiece, parseInt(id)];
    let sotCheck = game.check;
    if (inCheck()) {  //C H E C K   L O G I C   B E G I N S
      instructionMessage.textContent= (sotCheck) ? 'This move doesn\'t get you out of check \r\n\'go back\' and Select a different piece.' : 'This move will put you in check \r\n\'go back\' and Select a different piece.';
      game.setDestination = [game.chosenPiece, oldDest];
      if (capture === true) capturePiece.position = oldCapture;
      boardRefresh();
    } else {                                            //C H E C K   L O G I C   E N D S
      //castle go logic
        let canCastle = checkCastle(pieceCode(game.chosenPiece, true),id);
        if (canCastle != 'none') { castle(canCastle) }
        else{
          switch(game.getPieces[game.chosenPiece].piece){
            case 'White King Rook': game.shortCastleWhite = false; break;
            case 'Black King Rook': game.shortCastleBlack = false; break;
            case 'White Queen Rook': game.longCastleWhite = false; break;
            case 'Black Queen Rook': game.longCastleBlack = false; break;
            case 'White King': game.shortCastleWhite = false; game.longCastleWhite = false; break;
            case 'Black King': game.shortCastleBlack = false; game.longCastleBlack = false; break;
          }
        }
        // P A W N   P R O M O T I O N
      if ([0,1,2,3,4,5,6,7].includes(parseInt(id)) && pieceCode(game.chosenPiece) === 'wn'){
        promotionMessage.style.visibility = "visible";
        promotionForm.style.visibility = "visible";
        actionButton.style.visibility = "hidden";
      }
      boardRefresh();
      stateThree();
    }}
   else { invalidMove(pieceCode(game.chosenPiece)); }
}

const setPointOfOrigin = (id) => {
  for (let i = 0; i < 32; i ++){
    if (game.getPieces[i].position === parseInt(id)){
      if(game.getPieces[i].piece.charAt(0) != game.colorPlaying.charAt(0)){
        instructionMessage.setAttribute('style', 'white-space: pre;');
        instructionMessage.textContent = `This is not a ${game.colorPlaying.toLowerCase()} player piece. \r\n Select your own color piece.`;
      } else {
        let move = moves(i);
        instructionMessage.setAttribute('style', 'white-space: pre;');
        if (isNaN(move[0])) { instructionMessage.textContent = `You are blocked (${move}) \r\n Select a different piece.`; }
        else { stateTwo(move); }
      }      
    }
  }
}

const specialMenuToggle = () => {
  let myMenu = document.getElementById('specialMenu');
  let myStuff = document.getElementById('specialStuff');
  (myMenu.checked === true) ? myStuff.style.visibility = "visible" : myStuff.style.visibility = "hidden"; 
}

const squareHub = (id) => {
  if (game.gameState === 2) setDestination(id);
  if (game.gameState === 1) setPointOfOrigin(id);
}

const threatId = () => {
  let result = -1
  for(let i=0; i < 32;i++){
    if (game.getPieces[i].position === game.threatLoc[0]) result = i;
  }
  return result;
}

const trophyRefresh = () => {
  clearParent('topTrophyCase');
  clearParent('bottomTrophyCase');
  let trophyPieces = [];
  let pl = -1;
  for(let i = 0; i < 32; i++){
    pl = game.getPieces[i].position;
    if(pl === -1) trophyPieces = trophyPieces.concat(i);   
  }
  addTrophies(trophyPieces);
}

export {addTrophies, blockSet, blockThreat, boardRefresh, changePlayers, dataPull, inCheck, inCheckMate, inStaleMate, isOpponent, isThreat, pawnPromotion, pieceCode, specialMenuToggle}
