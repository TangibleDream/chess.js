'use strict';
import { squareColor, piecesJSON } from './helpers.js';


let pieces = JSON.parse(piecesJSON());
let pieceNum = -1;

const piecePresent = (num) => {
    let result = false;
    for (let i = 0; i < 32; i ++){
        if (pieces.pieces[i].position === num)
        {
          result = true;
          pieceNum = i;
        }
    }
    return result
}

const movePiece = (id) => {
  for (let i = 0; i < 32; i ++){
    if (pieces.pieces[i].position === parseInt(id)){
      alert(`This piece is ${pieces.pieces[i].piece}`);
    }
  }
}

const boardRefresh = () => {

    let squares = [];
    let anchorElement = [];
    let addAnchor = false;

    for (let i = 0; i < 64; i ++){
        addAnchor = false;
        squares[i] = document.createElement("img");
        if (piecePresent(i)){
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
            document.getElementById('chessBoard').appendChild(anchorElement[i]);
            document.getElementById(`${i}`).addEventListener("click", function(e) { movePiece(this.id) });
            document.getElementById(`${i}`).appendChild(squares[i]);
        } else {
            document.getElementById('chessBoard').appendChild(squares[i]);
        }
        if (((i+1) % 8 === 0) && (i < 60))
        {
          document.getElementById('chessBoard').appendChild(document.createElement('br'));
        }

    }
}

boardRefresh();
document.getElementById('instructionMessage').textContent = 'Player One: Select which piece to move.';
