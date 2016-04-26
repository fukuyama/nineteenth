/***
 * @file BattlePositionScene.coffee
 * 戦闘開始シーン
 */

phina.define('nz.BattlePositionScene', {
  superClass : 'phina.display.DisplayScene',

  // 初期化
  init(param) {
    console.log('BattlePositionScene init');
    this.superInit(param);
    //this.setInteractive(true);

    this.characters = param.characters;
    this.mapSprite  = param.mapSprite;
    this.mapx = param.mapx;
    this.mapy = param.mapy;

    // TEST:
    this.on('pointend', (e) => {
      console.log('BattlePositionScene pointend',e);
      const pos = this.mapSprite.calcMapXY(e.pointer);
      this.setupPlacementArea(pos);
    });
  },

  setupPlacementArea(pos) {
    const l = this.calcDistanceAddress(pos,2);
    for (a in l) {
      this.mapSprite.blink(a.mapx,a.mapy);
    }
  },

  calcDistanceAddress(pos,distance) {
    const minx = pos.mapx - distance;
    const miny = pos.mapy - distance;
    const maxx = pos.mapx + distance;
    const maxy = pos.mapy + distance;
    const l = [];
    for (let x = minx; x < maxx; x++) {
      for (let y = miny; y < maxy; y++) {
        const p1 = {mapx:x,mapy:y};
        if (nz.Graph.distance(pos,p1) < distance) {
          l.push(p1);
        }
      }
    }
    return l;
  }
});
