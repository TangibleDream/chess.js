const flipValue = idx => { return 63 - idx }

const getX = index => {
  while ((index + 1) > 8) {
    index = index - 8
  }
  return index + 1
}

const getY = index => { return Math.floor(index / 8) + 1 }

const isOdd = num => { return num % 2 != 0 }

const piecesJSON = () => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'pieces.json', false);
  //xhr.responseType = 'text';
  xhr.send();
  return xhr.responseText;
}

const squareColor = index => {
   return ((isOdd(getY(index)) === isOdd(getX(index))) ? "white" : "black");
}
export { flipValue, getX, getY, piecesJSON, squareColor }
