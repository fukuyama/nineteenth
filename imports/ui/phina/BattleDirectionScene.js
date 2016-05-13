/***
 * @file BattleDirectionScene.js
 * 向き設定シーン
 */

phina.define('nz.BattleDirectionScene', {
  superClass : 'nz.BattleSceneBase',

  // 初期化
  init(param) {
    this.superInit(param);

    this.on('enter', () => {
      console.log('BattleDirectionScene enter');
    });

    this.character = param.character;
    this.mapSprite = param.mapSprite;

    this.on('exit', () => {
      console.log('BattleDirectionScene exit');
    });

    this.on('pointend', (e) => {
      this.exit();
    });
    _createPointer();
  },

  _createPointer() {
    this.pointer = tm.display.Shape({
      width  : 10,
      height : 10
    }).addChildTo(this.character);
    tm.display.CircleShape({
      x         : 40,
      width     : 10,
      height    : 10,
      fillStyle : 'blue'
    }).addChildTo(this.pointer);
    // this.pointer.rotation = this.target.body.rotation;
  }

});
