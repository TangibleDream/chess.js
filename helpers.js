const getX = (index) => {
  while ((index + 1) > 8) {
    index = index - 8
  }
  return (index + 1)
}

const getY = (index) => {
  return (Math.floor(index / 8)) + 1
}

export { getX, getY }