/***
 * @file BattleDirectionScene.js
 * 向き設定シーン
 */

import {
  DIRECTIONS
} from '/imports/ui/lib/constants.js';


phina.define('nz.BattleDirectionScene', {
  superClass : 'nz.BattleRotatePointerScene',

  // 初期化
  init(param) {
    this.superInit(param);
    this._direction = this.character.direction;
    this._remnant   = param.remnant;
  },

  _setupCommand() {
    //console.log('setupCommand');
    this.character.setDirection(this._direction);
  },

  _movePointer(pointer) {
    if (!this.pointer) {
      return;
    }
    const pos = this.character.globalToLocal(pointer.position);
    const t = this.pointer.position;
    const v = phina.geom.Vector2(pos.x - t.x,pos.y - t.y);
    this._rotatePointer(Math.radToDeg(v.toAngle()));
  },

  _normalizRotation(r) {
    while (r >  180) {r -= 360;}
    while (r < -180) {r += 360;}
    return r;
  },

  _directionCost(direction1,direction2) {
    return Math.abs(3 - Math.abs((direction2 - direction1 - 3) % 6));
  },

  _rotatePointer(rotation) {
    rotation = this._normalizRotation(rotation);
    DIRECTIONS.forEach( (d,i) => {
      if (d.rotation - 30 <= rotation && rotation <= d.rotation + 30) {
        const costd = this._directionCost(this.character.direction, d.index);
        if (costd <= this._remnant) {
          if (this._direction != d.index) {
            this._direction = d.index;
            this.pointer.rotation = d.rotation;
            this._keyRotate = d.rotation;
            return;
          }
        }
      }
    });
    //@_keyRotate = DIRECTIONS[@_direction].rotation
  }

});
