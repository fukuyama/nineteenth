/***
 * @file BattlePositionScene.js
 * 戦闘開始シーン
 */

phina.define('nz.BattlePositionScene', {
  superClass: 'nz.BattleSceneBase',

  // 初期化
  init(param) {
    this.superInit(param);

    this.characterIndex = 0;

    this.characters = param.characters;
    const mapSprite = this.mapSprite  = param.mapSprite;

    let pos = {
      mapx : mapSprite.mapx,
      mapy : mapSprite.mapy
    };
    // TEST: 北側
    pos.mapy -= 5;
    this.setupPlacementArea(pos);

    this.on('map.pointmove', mapSprite.moveListener());

    this.setupKeyboradHandler();
    this.setupCursorHandler();

    this.on('input.enter', (e) => {
      this.selectPosition();
    });

    this.on('map.pointend', (e) => {
      this.selectPosition();
    });
  },

  selectPosition() {
    const cursor = mapSprite.cursor;
    console.log('input.enter',cursor.mapx,cursor.mapy);
    if (!this.mapSprite.existBlink(e.mapx,e.mapy)) {
      return;
    }
    const character = this.characters[this.characterIndex];
    character.addChildTo(mapSprite).setMapPosition(e.mapx,e.mapy);
    const scene = new nz.BattleDirectionScene({
      character : character,
      mapSprite : mapSprite
    });
    this.scene_phase(scene);
  },

  setupPlacementArea(pos) {
    this.calcDistanceAddress(pos,2).forEach( (a) => {
      this.mapSprite.blink(a.mapx,a.mapy);
    });
  },

  calcDistanceAddress(pos,distance) {
    const minx = pos.mapx - distance;
    const miny = pos.mapy - distance;
    const maxx = pos.mapx + distance;
    const maxy = pos.mapy + distance;
    const l = [];
    for (let x = minx; x <= maxx; x++) {
      for (let y = miny; y <= maxy; y++) {
        const p1 = {mapx:x,mapy:y};
        if (nz.Graph.distance(pos,p1) <= distance) {
          l.push(p1);
        }
      }
    }
    return l;
  }
});
