/***
 * @file BattleScene.js
 * 戦闘シーン
 */

import { CharacterTypes } from '/imports/api/character-types/character-types.js';

phina.define('nz.BattleScene',{
  superClass: 'nz.BattleSceneBase',

  // 初期化
  init (param) {
    this.superInit(param);

    this.characters = [];
    param.characters.forEach( (character) => {
      const type = CharacterTypes.findOne(character.typeId);
      this.characters.push(
        nz.CharacterSprite({
          character : character,
          type      : type
        })
      );
    });

    this.mapSprite = nz.MapSprite({
      mapId : param.mapId,
      mapx  : param.mapx,
      mapy  : param.mapy
    })
    .addChildTo(this)
    .moveTo(
      this.gridX.center(),
      this.gridY.center()
    );
    let c1 = undefined;
    let c2 = undefined;
    this.on('map.pointstart', (e) => {
      if (!c1) {
        c1 = {
          mapx : e.mapx,
          mapy : e.mapy
        };
      } else {
        c2 = {
          mapx : e.mapx,
          mapy : e.mapy
        };
        const res = nz.Graph.distance(c1,c2);
        console.log('distance',c1,c2,res);
        c1 = undefined;
      }
    });
    this.on('map.pointmove', this.mapSprite.moveListener());

    this.setupKeyboradHandler();
    this.setupCursorHandler();

    this.next('start_phase');
  },

  start_phase () {
    this.next('map_load_phase');
  },

  map_load_phase () {
    if (this.mapSprite.mapReady()) {
      console.log('map loaded.');
      this.next('setup_position_phase');
      //this.next('start_turn');
    }
  },

  setup_position_phase () {
    const scene = nz.BattlePositionScene({
      width      : this.width,
      height     : this.height,
      groups     : this.groups,
      mapSprite  : this.mapSprite,
      characters : this.characters
    });
    this.scene_phase(scene).next('start_turn');
  },

  start_turn () {
    console.log('start_turn');
    this.next(null);
  }

});
