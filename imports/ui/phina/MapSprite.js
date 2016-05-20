/***
 * @file MapSprite.js
 * 戦闘マップスプライト
 */

import { RangeMapCells } from '/imports/api/map-cells/map-cells.js';

import {
  MAP_CHIP_SIZE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from '/imports/ui/lib/constants.js';

phina.define('nz.MapSprite', {
  superClass: 'phina.display.DisplayElement',

  // 初期化
  init({mapId,mapx,mapy}) {
    this.mapId = mapId;
    this.mapx  = mapy;
    this.mapy  = mapy;
    this.superInit();
    this.mapw = (SCREEN_WIDTH  / 2 / MAP_CHIP_SIZE).ceil() + 1;
    this.maph = (SCREEN_HEIGHT / 2 / MAP_CHIP_SIZE).ceil() + 1;

    this.setInteractive(true);

    this._chips  = {};
    this._blinks = {};

    this._pointFlag = false;
    this._mapReady  = false;

    this._range = {
      min : {x:0,y:0},
      max : {x:0,y:0}
    };
    this._firstRun = true;
    this._handlers = [];

    this.on('canvas.mouseout', (e) => {
      e.app.mouse._end();
    });
    this.on('destroyed', () => {
      this.unsubscribeMapCell(true);
    });
  },

  moveListener() {
    return (e) => {
      if (this.isDrag()) {
        this.moveTo(
          this.x + e.pointer.dx,
          this.y + e.pointer.dy
        );
      }
    };
  },

  currentMapXY() {
    return this.calcMapXY(this.x,this.y);
  },
  calcMapXY(x,y) {
    const addr = nz.Graph.pos2mapXY(x,y);
    addr.mapx += this.mapx;
    addr.mapy += this.mapy;
    return addr;
  },

  subscribeMapCell(param) {
    this._handlers.push(
      Meteor.subscribe(
        'RangeMapCells',
        param,
        {
          onReady : () => {
            this.createMapChips(param);
          }
        }
      )
    );
  },

  unsubscribeMapCell(force=false) {
    const handlers = this._handlers;
    this._handlers = [];
    if (force) {
      handlers.forEach((h) => { h.stop() });
    } else {
      setTimeout(
        () => {
          if (this._dragFlag) {
            handlers.forEach((h) => { this._handlers.push(h) });
          } else {
            handlers.forEach((h) => { h.stop() });
          }
        },
        20000
      );
    }
  },

  moveTo(x,y) {
    this.x = x;
    this.y = y;
    this._refreshMap();
    return this;
  },

  _refreshMap() {
    // 表示Map座標
    const pos  = this.currentMapXY();
    const mapx = pos.mapx;
    const mapy = pos.mapy;

    // 表示範囲Map座標
    const vminx = - mapx - this.mapw;
    const vminy = - mapy - this.maph;
    const vmaxx = - mapx + this.mapw;
    const vmaxy = - mapy + this.maph;
    const query = {
      mapId : this.mapId,
      min   : {x : vminx, y : vminy},
      max   : {x : vmaxx, y : vmaxy}
    };
    if (this._firstRun) {
      this._firstRun = false;
      this.subscribeMapCell(query);
      this._range.min.x = vminx;
      this._range.min.y = vminy;
      this._range.max.x = vmaxx;
      this._range.max.y = vmaxy;
      return;
    }
    let subscribe = false;
    if (vminx < this._range.min.x) {
      query.min = {x : vminx,                 y : this._range.min.y};
      query.max = {x : this._range.min.x + 1, y : this._range.max.y};
      this.subscribeMapCell(query);
      this._range.min.x = vminx;
      subscribe = true;
    }
    if (vminy < this._range.min.y) {
      query.min = {x : this._range.min.x, y : vminy                };
      query.max = {x : this._range.max.x, y : this._range.min.y + 1};
      this.subscribeMapCell(query);
      this._range.min.y = vminy;
      subscribe = true;
    }
    if (this._range.max.x < vmaxx) {
      query.min = {x : this._range.max.x - 1, y : this._range.min.y};
      query.max = {x : vmaxx,                 y : this._range.max.y};
      this.subscribeMapCell(query);
      this._range.max.x = vmaxx;
      subscribe = true;
    }
    if (this._range.max.y < vmaxy) {
      query.min = {x : this._range.min.x, y : this._range.max.y - 1};
      query.max = {x : this._range.max.x, y : vmaxy                };
      this.subscribeMapCell(query);
      this._range.max.y = vmaxy;
      subscribe = true;
    }
    // TODO: 広げすぎたら消したいかも。ためしに、まずは、childrenからのみ除外で、必要な部分のみ追加する感じに
    if (subscribe) {
      this.unsubscribeMapCell();
    } else {
      this.createMapChips(query);
    }
  },

  createMapChips({mapId,min,max}) {
    // 表示範囲Map座標
    RangeMapCells.find({
      mapId : mapId,
      mapx  : {
        $gt : min.x,
        $lt : max.x
      },
      mapy  : {
        $gt : min.y,
        $lt : max.y
      }
    }).forEach(this.createMapChip.bind(this));
    this._mapReady = true;
    if (this.parent) {
      this.parent.flare('map.refreshed');
    }
    if (!this.cursor) {
      this.cursor = this._createCursor();
    }
    this.cursor.addChildTo(this);
  },

  _createCursor() {
    cursor = phina.display.Shape({
      x           : 0,
      y           : 0,
      width       : MAP_CHIP_W,
      height      : MAP_CHIP_H,
      strokeStyle : 'red',
      lineWidth   : 3,
      visible     : true
    });
    cursor._render = function () {
      canvas.strokeRect(0, 0, this.width, this.height);
    };
    cursor.render();
    return cursor
  },

  mapReady() {
    return this._mapReady;
  },

  existChip(mapx,mapy) {
    return (this._chips[mapx] && this._chips[mapx][mapy]) ? true : false;
  },

  existBlink(mapx,mapy) {
    return (this._blinks[mapx] && this._blinks[mapx][mapy]) ? true : false;
  },

  createMapChip({index,mapx,mapy}) {
    if (this.existChip(mapx,mapy)) {
      return this._chips[mapx][mapy];
    }
    const sz  = MAP_CHIP_SIZE;
    const pos = nz.Graph.mapXY2pos(
      mapx + this.mapx,
      mapy + this.mapy
    );
    const chip = phina.display.Sprite('map_chip',sz,sz)
      .addChildTo(this)
      .setPosition(pos.x,pos.y)
      .setFrameIndex(index,sz,sz)
      .setInteractive(true)
      .setBoundingType('rect')
      .on('pointstart', this._chipPointStart.bind(this))
      .on('pointover' , this._chipPointOver.bind(this))
      .on('pointmove' , this._chipPointMove.bind(this))
      .on('pointout'  , this._chipPointOut.bind(this))
      .on('pointend'  , this._chipPointEnd.bind(this));
    chip.mapx = mapx;
    chip.mapy = mapy;
    if (!this._chips[mapx]) {
      this._chips[mapx] = {};
    }
    this._chips[mapx][mapy] = chip;
    return chip;
  },

  getMapPosition(mapx,mapy) {
    if (this.existChip(mapx,mapy)) {
      return this._chips[mapx][mapy].position;
    }
    return undefined;
  },

  blink(mapx,mapy) {
    if (this.existBlink(mapx,mapy)) {
      return;
    }
    const pt = this.getMapPosition(mapx,mapy);
    if (!pt) {
      return;
    }
    const blink = phina.display.RectangleShape({
      width  : MAP_CHIP_SIZE,
      height : MAP_CHIP_SIZE,
      stroke : 'gray',
      fill   : 'gray'
    })
     .addChildTo(this)
     .setPosition(pt.x,pt.y)
     .setInteractive(true)
     .setVisible(true);

    blink.tweener.clear().fade(0.5,500).fade(0.1,500).setLoop(true);
    if (!this._blinks[mapx]) {
      this._blinks[mapx] = {};
    }
    this._blinks[mapx][mapy] = blink;
  },

  isDrag() {
    return this._dragFlag;
  },

  _chipPointStart(e) {
    this._pointFlag = true
    this._dispatchEvent(e);
  },

  _chipPointOver(e) {
    this._dispatchEvent(e);
  },

  _chipPointMove(e) {
    if (this._pointFlag) {
      this._dragFlag = true;
    }
    this._dispatchEvent(e);
  },

  _chipPointOut(e) {
    this._dispatchEvent(e);
  },

  _chipPointEnd(e) {
    this._pointFlag = false;
    this._dragFlag  = false;
    this._dispatchEvent(e);
  },

  _dispatchEvent(e) {
    if (this.parent) {
      this.parent.flare('map.' + e.type, {
        mapx    : e.target.mapx,
        mapy    : e.target.mapy,
        pointer : e.pointer
      });
    }
  }

});
