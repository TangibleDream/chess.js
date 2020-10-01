const dmap = {'east' : ['pos',1,['en','ok'],['ng'],1], 'west' : ['neg',1,['en','ok'],['ng'],8], 'south' : ['pos',8,['en','ok'],['ng'],8]
  , 'southeast' : ['pos',9,['en','op'],['ng'],1] , 'southwest' : ['pos',7,['en','op'],['ng'],8], 'north' : ['neg',8,['en','ok'],['ng'],8]
  , 'northeast' : ['neg',7,['en','op'],['wn','ng'],1], 'northwest' : ['neg',9,['en','op'],['wn','ng'],8]}
const posNeg = (way) => {
  return dmap[way][0];
}
const osNum = (way) => {
  return dmap[way][1];
}
const disTht = (way) => {
  return dmap[way][2];
}
const adjTht = (way) => {
  return dmap[way][3];
}
const bound = (way) => {
  return dmap[way][4];
}

export { adjTht, bound, disTht, osNum, posNeg }
