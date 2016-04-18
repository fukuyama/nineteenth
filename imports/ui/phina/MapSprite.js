/***
 * @file MapSprite.coffee
 * 戦闘マップスプライト
 */

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
    this._pointChip = null;
    this._mapReady  = false;

    this._range = {
      min : {x:0,y:0},
      max : {x:0,y:0}
    };
    this._firstRun = true;
    this._handlers = [];

    this.on('canvas.mouseout', () => {
      if (this._dragFlag) {
        app.mouse._end();
      }
    });
    this.on('destroyed', () => {
      this.unsubscribeMapCell(true);
    });
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
        'MapCells.Range',
        param,
        {
          onReady()
          {
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
    this.refreshMap();
    return this;
  },

  refreshMap() {
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
      mapid : this.mapid,
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
    if (!subscribe) {
      this.createMapChips(query);
    }
  },

  createMapChips({mapId,min,max}) {
    // 表示範囲Map座標
    MapCells.Range.find({
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
    if (this._chips[mapx]) {
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
    if (this._blinks[mapx]) {
      this._blinks[mapx] = {};
    }
    this._blinks[mapx][mapy] = blink;
  },

  _chipPointStart(e) {
    this._pointFlag = true
    this._pointChip = e.target
  },

  _chipPointOver(e) {
  },

  _chipPointMove(e) {
    if (this._pointFlag) {
      this._dragFlag = true;
      this.moveTo(
        this.x + e.pointer.dx,
        this.y + e.pointer.dy
      );
    }
  },

  _chipPointOut(e) {
  },

  _chipPointEnd(e) {
    console.log('pointend', {
      mapx : e.target.mapx,
      mapy : e.target.mapy
    });
    if (this._dragFlag) {
      this.unsubscribeMapCell();
    }
    this._pointFlag = false;
    this._dragFlag  = false;
    this._pointChip = null;
  }
});