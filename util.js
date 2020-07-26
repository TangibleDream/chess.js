import { squareColor } from './helpers.js';

let pieces = {
                   "pieces":[
                     {
                       "piece":"White King",
                       "position":60,
                       "captured":false
                     },
                     {
                       "piece":"Black King",
                       "position":4,
                       "captured":false
                     },
                     {
                       "piece":"White Queen",
                       "position":59,
                       "captured":false
                     },
                     {
                       "piece":"Black Queen",
                       "position":3,
                       "captured":false
                     },
                     {
                       "piece":"White King Bishop",
                       "position":61,
                       "captured":false
                     },
                     {
                       "piece":"Black King Bishop",
                       "position":5,
                       "captured":false
                     },
                     {
                       "piece":"White Queen Bishop",
                       "position":58,
                       "captured":false
                     },
                     {
                       "piece":"Black Queen Bishop",
                       "position":2,
                       "captured":false
                     },
                     {
                       "piece":"White King Knight",
                       "position":62,
                       "captured":false
                     },
                     {
                       "piece":"Black King Knight",
                       "position":6,
                       "captured":false
                     },
                     {
                       "piece":"White Queen Knight",
                       "position":57,
                       "captured":false
                     },
                     {
                       "piece":"Black Queen Knight",
                       "position":1,
                       "captured":false
                     },
                     {
                       "piece":"White King Rook",
                       "position":63,
                       "captured":false
                     },
                     {
                       "piece":"Black King Rook",
                       "position":7,
                       "captured":false
                     },
                     {
                       "piece":"White Queen Rook",
                       "position":56,
                       "captured":false
                     },
                     {
                       "piece":"Black Queen Rook",
                       "position":0,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn One",
                       "position":48,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn Two",
                       "position":49,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn Three",
                       "position":50,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn Four",
                       "position":51,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn Five",
                       "position":52,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn Six",
                       "position":53,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn Seven",
                       "position":54,
                       "captured":false
                     },
                     {
                       "piece":"White Pawn Eight",
                       "position":55,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn One",
                       "position":8,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn Two",
                       "position":9,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn Three",
                       "position":10,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn Four",
                       "position":11,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn Five",
                       "position":12,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn Six",
                       "position":13,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn Seven",
                       "position":14,
                       "captured":false
                     },
                     {
                       "piece":"Black Pawn Eight",
                       "position":15,
                       "captured":false
                     }
                   ]
                 }
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

const boardRefresh = () => {

    let squares = []

    for (let i = 0; i < 64; i ++){
        squares[i] = document.createElement("img");
        if (piecePresent(i)){
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
        document.getElementById('chessBoard').appendChild(squares[i]);
        if (((i+1) % 8 === 0) && (i < 60))
        {
          document.getElementById('chessBoard').appendChild(document.createElement('br'));
        }

    }
}

boardRefresh();
