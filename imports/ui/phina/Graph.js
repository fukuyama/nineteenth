
'use strict';

import {
  MAP_CHIP_SIZE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from '/imports/ui/lib/constants.js';

export const Graph = class Graph {
  constructor(param = {}) {
    return
  }

  /*** 距離
   * @param {Object} c1 元(mapx,mapy)
   * @param {Object} c2 対象(mapx,mapy)
   */
  static distance(c1,c2) {
    const hx = Math.abs(c1.mapx - c2.mapx);
    const hr = Math.ceil(hx / 2);
    let hy   = Math.abs(c1.mapy - c2.mapy);
    if (hy < hr) {
      return hx;
    }
    if (hx % 2 === 1) {
      if (c1.mapx % 2 === 0) {
        if (c1.mapy <= c2.mapy) {
          hy += 1;
        }
      } else {
        if (c1.mapy <= c2.mapy) {
          hy += 1;
        }
      }
    }
    return hx + hy - hr;
  }

  static pos2mapXY(x,y) {
    if (typeof x == 'object') {
      y = x.y;
      x = x.x;
    }
    const mapx = ((x - SCREEN_WIDTH  / 2) / MAP_CHIP_SIZE).round();
    if (Math.abs(mapx % 2) == 1) {
      y -= MAP_CHIP_SIZE / 2;
    }
    const mapy = ((y - SCREEN_HEIGHT / 2) / MAP_CHIP_SIZE).round();
    return {
      mapx : mapx,
      mapy : mapy
    };
  }

  static mapXY2pos(mapx,mapy) {
    let x = mapx * MAP_CHIP_SIZE;
    let y = mapy * MAP_CHIP_SIZE;
    if (Math.abs(mapx % 2) == 1) {
      y += MAP_CHIP_SIZE / 2;
    }
    return {
      x : x,
      y : y
    };
  }

  static neighborMapXY (mapx,mapy) {
    l = [];
    return l;
  }
}
