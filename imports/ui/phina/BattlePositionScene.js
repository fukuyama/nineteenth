/***
 * @file BattlePositionScene.coffee
 * 戦闘開始シーン
 */

phina.define('nz.BattlePositionScene', {
  superClass : 'phina.display.DisplayScene',

  // 初期化
  init(param) {
    this.superInit(param);

    this.characters = param.characters;
    this.mapSprite  = param.mapSprite;
    this.mapx = param.mapx;
    this.mapy = param.mapy;

    this.on('pointend', (e) => {
      const pos = this.mapSprite.calcMapXY(e.pointer);
      const l   = this.calcDistanceAddress(pos,2);
      for (a in l) {
        this.mapSprite.blink(a.mapx,a.mapy);
      }
      this.exit();
    });
  },

  calcDistanceAddress(pos,distance) {
    const mapx = pos.mapx;
    const mapy = pos.mapy;
    const l = [];
    for x in [mapx - distance .. mapx + distance]
      for y in [mapy - distance .. mapy + distance]
        p1 = {mapx:x,mapy:y}
        if nz.Graph.distance(pos,p1) is distance
          l.push p1
    return l
  }
});
