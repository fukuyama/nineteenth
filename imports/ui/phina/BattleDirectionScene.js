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

    //const parent = this.mapSprite.parent;
    //this.addChild(this.mapSprite);
    // this.on('enter', () => {
    //   this.addChild(this.mapSprite);
    // });
    this.on('exit', () => {
      console.log('BattleDirectionScene exit');
      //parent.addChild(this.mapSprite);
    });

    this.on('pointend', (e) => {
      this.exit();
    });
  }

});
