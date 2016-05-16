export const MAP_CHIP_SIZE = 32;
export const SCREEN_WIDTH  = 640;
export const SCREEN_HEIGHT = 480;
export const DIRECTIONS    = [
  {name:'up'        , rotation:  -90, index:0, rotateIndex:[ 0, 1, 2, 3,-2,-1]},
  {name:'up_right'  , rotation:  -30, index:1, rotateIndex:[-1, 0, 1, 2, 3,-2]},
  {name:'down_right', rotation:   30, index:2, rotateIndex:[-2,-1, 0, 1, 2, 3]},
  {name:'down'      , rotation:   90, index:3, rotateIndex:[ 3,-2,-1, 0, 1, 2]},
  {name:'down_left' , rotation:  150, index:4, rotateIndex:[ 2, 3,-2,-1, 0, 1]},
  {name:'up_left'   , rotation: -150, index:5, rotateIndex:[ 1, 2, 3,-2,-1, 0]},
  {name:'default'   , rotation:   90, index:6, rotateIndex:[ 0, 1, 2, 3,-2,-1]}
];
