/***
 * @file BattleRotatePointerScene.js
 * 方向指示用のポインターを操作するシーンクラス
 */

phina.define('nz.BattleRotatePointerScene', {
  superClass : 'nz.BattleSceneBase',

  init(param) {
    this.superInit(param);
    this.character = param.character;
    this.mapSprite = param.mapSprite;

    this.setInteractive(true);

    this.on('pointend', (e) => {
      this._setupCommand();
      this._endScene();
    });
    this.on('enterframe', (app) => {
      this.app.pointers.forEach((p) => {
        if (p.id !== null) {
          this._movePointer(p);
        }
      });
    });
    this._createPointer();
  },

  _setupCommand() {},

  _rotatePointer(r) {},

  _movePointer(pointer) {},

  _endScene() {
    this._removePointer();
    this.exit();
  },

  _createPointer() {
    this.pointer = phina.display.Shape({
      width  : 10,
      height : 10,
      backgroundColor : 'transparent'
    }).addChildTo(this.character);
    phina.display.CircleShape({
      x      : 40,
      width  : 10,
      height : 10,
      fill   : 'blue',
      radius : 8
    }).addChildTo(this.pointer);
    // this.pointer.rotation = this.target.body.rotation;
  },

  _removePointer() {
    if (this.pointer) {
      this.pointer.remove();
      this.pointer = null
    }
  }

});
