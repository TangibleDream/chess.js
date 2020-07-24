const getX = (index) => {
  while ((index + 1) > 8) {
    index = index - 8
  }
  return (index + 1)
}

const getY = (index) => {
  return (Math.floor(index / 8)) + 1
}

const squareColor = (index) => {
   return ((getY(index) %2 != 0) ? ((getX(index) % 2 != 0) ? "white" : "black") : ((getX(index) % 2 != 0) ? "black" : "white"));
}

export { getX, getY, squareColor }
