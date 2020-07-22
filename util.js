const boardRefresh = () => {
    document.write('\
    <img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><br>\
                    <img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><br>\
                    <img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><br>\
                    <img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><br>\
                    <img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><br>\
                    <img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><br>\
                    <img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><br>\
                    <img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><img src="images\\bbkgr.png"><img src="images\\wbkgr.png"><br>\
    ');
}
const getX = (index) => {
  while ((index + 1) > 8) {
    index = index - 8
  }
  return (index + 1)
}

const getY = (index) => {
  return (Math.floor(index / 8)) + 1
}
//console.log(getX(15) === 8);  // true
//console.log(getY(15) === 2);  // true
boardRefresh();
