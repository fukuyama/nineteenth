/***
 * @file BattleDirectionScene.js
 * 向き設定シーン
 */

phina.define('nz.BattleDirectionScene', {
  superClass : 'nz.BattleRotatePointerScene',

  // 初期化
  init(param) {
    this.superInit(param);

    this.on('enter', () => {
      console.log('BattleDirectionScene enter');
    });

    this.on('exit', () => {
      console.log('BattleDirectionScene exit');
    });
  },

  _movePointer(pointer) {
    console.log('_movePointer',pointer.position);
  }

});
