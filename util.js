'use strict';
const checkKnightX = (loc) => {
    let result = []
    switch (getX(loc)) {
      case 1:
        result = [-17,-10,6,15];
        break;
      case 2:
        result = [-10,6];
        break;
      case 7:
        result = [-6,10];
        break;
      case 8:
        result = [-15,-6,10,17];
        break;
    }
    return result;
};
  
const checkKnightY = (loc) => {
    let result = []
    switch (getY(loc)) {
      case 1:
        result = [-6,-10,-15,17];
        break;
      case 2:
        result = [-15,-17];
        break;
      case 7:
        result = [15,17];
        break;
      case 8:
        result = [6,10,15,17];
        break;
    }
    return result;
};

const clearParent = (id) => {
    let element = document.getElementById(id);
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
}

const findSquare = (e) => {
    let element = document.elementFromPoint(e.pageX, e.pageY);
    let pe = element.parentNode
    return pe.id
}

const flipValue = idx => { return 63 - idx }

const getX = index => {
    while ((index + 1) > 8) {
      index = index - 8
    }
    return index + 1
}

const getY = index => { return Math.floor(index / 8) + 1 }

const isOdd = num => { return num % 2 != 0 }

const offset = (num, moves, pos = 'pos') => {return (pos === 'pos' ? (num * (moves + 1)) : ((num * (moves + 1)) - ((num * (moves + 1))*2))) }

const squareColor = index => { return ((isOdd(getY(index)) === isOdd(getX(index))) ? "white" : "black"); }

export { checkKnightX, checkKnightY, clearParent, findSquare, flipValue , getX, getY, offset, squareColor}
