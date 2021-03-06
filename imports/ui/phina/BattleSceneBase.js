/***
 * @file BattleSceneBase.js
 * 戦闘シーン基底クラス
 */

import { CharacterTypes } from '/imports/api/character-types/character-types.js';

phina.define('nz.BattleSceneBase',{
  superClass: 'phina.display.DisplayScene',

  // 初期化
  init (param) {
    this.superInit(param);

    this.on('canvas.mouseout', (e) => {
      if (this.mapSprite) {
        this.mapSprite.fire(e);
      }
    });
    this.on('destroyed', (e) => {
      if (this.mapSprite) {
        this.mapSprite.fire(e);
      }
    });
  },

  next (fn) {
    if (typeof fn === 'string') {
      if (! this[fn]) {
        throw new Error('next ' + fn + ' not found.');
        return;
      }
      fn = this[fn];
    }
    this.update = fn;
  },

  scene_phase (scene) {
    scene.addChild(this.mapSprite);
    scene.on('exit', () => {
      this.addChild(this.mapSprite);
    });
    this.app.pushScene(scene);
    this.update = null;
    return {
      next : (fn) => {
        scene.on('exit', () => {
          this.next(fn);
        });
      }
    };
  },

  setupCursorHandler() {
    this.dispatchKeyboradEvent({
      keys   : ['up','down','left','right'],
      target : this.mapSprite.cursor
    });
  },

  dispatchKeyboradEvent(param) {
    const keys    = param.keys;
    const target  = param.target;
    const handler = (e) => {target.fire(e)};
    keys.forEach((key) => {
      this.on('input.'  + key, handler);
      this.on('repeat.' + key, handler);
    });
  }

});
