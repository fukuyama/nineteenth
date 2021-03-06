/***
 * @file BattlePositionScene.js
 * 戦闘開始シーン
 */

import { setupKeyboradHandler } from './KeyboradHandler.js';

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

    setupKeyboradHandler(this);
    this.setupCursorHandler();

    this.on('input.enter', (e) => {
      this.selectPosition(e);
    });

    this.on('map.pointend', (e) => {
      this.selectPosition(e);
    });
  },

  selectPosition(e) {
    const mapSprite = this.mapSprite;
    const cursor = mapSprite.cursor;
    const mapx = cursor.mapx;
    const mapy = cursor.mapy;
    if (!mapSprite.existBlink(mapx,mapy)) {
      return;
    }
    const character = this.characters[this.characterIndex];
    if (!character) {
      console.log('no character');
      return;
    }
    character.addChildTo(mapSprite).setMapPosition(mapx,mapy);
    const scene = nz.BattleDirectionScene({
      character : character,
      mapSprite : mapSprite,
      remnant   : 6
    });
    this.scene_phase(scene);
    this.characterIndex += 1;
    scene.on('exit',() => {
      if (!this.characters[this.characterIndex]) {
        console.log('exit no character');
        this.mapSprite.clearBlink();
        this.exit();
        return;
      }
    });
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
