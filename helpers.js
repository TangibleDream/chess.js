const flipValue = idx => { return 63 - idx }

const getX = index => {
  while ((index + 1) > 8) {
    index = index - 8
  }
  return index + 1
}

const getY = index => { return Math.floor(index / 8) + 1 }

const isOdd = num => { return num % 2 != 0 }

const isOpponent = (pArr, pNum) => { return (pArr.getPieces[pNum].piece.charAt(0) != pArr.getColorPlaying.charAt(0)) }

const isThreat = (disArr, adjArr, ePiece, mPiece, moves) => {
  let result = false
  if ((disArr.includes(ePiece) && [0,1].includes(mPiece)) || (adjArr.includes(ePiece) && moves === 0)) {
    result = true;
  }
  return result
}

const offset = (num, moves, pos = 'pos') => {return (pos === 'pos' ? (num * (moves + 1)) : ((num * (moves + 1)) - ((num * (moves + 1))*2))) }

const pieceCode = (pArr, pNum, full = false) => {
  let result = (full ? pArr.getPieces[pNum].piece : pArr.getPieces[pNum].piece.slice(pArr.getPieces[pNum].piece.length - 2));
  return result;
}

const squareColor = index => { return ((isOdd(getY(index)) === isOdd(getX(index))) ? "white" : "black"); }

export { flipValue, getX, getY, isOpponent, isThreat, offset, pieceCode, squareColor }
