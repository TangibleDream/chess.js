const getX = index => {
  while ((index + 1) > 8) {
    index = index - 8
  }
  return index + 1
}

const getY = index => { return Math.floor(index / 8) + 1 }

const isOdd = num => { return num % 2 != 0 }

const squareColor = index => {
   return (isOdd(getY(index)) ? isOdd(getX(index)) ? "white" : "black" : isOdd(getX(index)) ? "black" : "white");
}

const piecesJSON = () => {
  let xhr = new XMLHttpRequest();
  let result = '';
  xhr.open('GET', 'pieces.json', false);
  xhr.resposeType = 'text';
  xhr.send();
  return xhr.responseText;
}

export { getX, getY, squareColor, piecesJSON }
