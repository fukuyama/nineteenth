
import './BattleScene.js';
import './MapSprite.js';
import './Graph.js';

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from '/imports/ui/lib/constants.js';

phina.define('nz.BattleApp', {
  superClass : 'phina.game.GameApp',
  init(param) {
    this.superInit(
      {
        query           : '#main',
        title           : 'Nineteenth',
        backgroundColor : 'white',
        width           : SCREEN_WIDTH,
        height          : SCREEN_HEIGHT,
        startLabel      : 'battle',
        assets : {
          image : {
            map_chip       : '/img/map_chip.png',
            character_test : '/img/character_test.png'
          },
          spritesheet : {
            character_test : '/ss/character_test.json'
          }
        },
        scenes : [
          {
            label     : 'battle',
            className : 'nz.BattleScene'
          }
        ]
      }.$safe(param)
    );
    this.on('canvas.mouseout', (e) => {
      if (this.currentScene) {
        this.currentScene.fire(e);
      }
    });
    this.on('destroyed', (e) => {
      if (this.currentScene) {
        this.currentScene.fire(e);
      }
    });
  },

  fitScreen(isEver = true) {
    self = this;
    const _fitFunc = function () {
      e = self.canvas.domElement;
      r = e.getBoundingClientRect();
      s = e.style;

      //s.position = "absolute"
      s.margin   = "auto";
      s.left     = "0px";
      s.top      = "0px";
      s.bottom   = "0px";
      s.right    = "0px";

      // チラつき防止
      // https://drafts.csswg.org/css-images/#the-image-rendering
      s.imageRendering = 'pixelated';

      w = Math.floor(window.innerWidth  - 30);
      h = Math.floor(window.innerHeight - r.top - 6);
      if (w > SCREEN_WIDTH) {
        w = SCREEN_WIDTH;
      }
      if (h > SCREEN_HEIGHT) {
        h = SCREEN_HEIGHT;
      }
      rateWidth  = e.width  / w;
      rateHeight = e.height / h;
      rate = e.height / e.width;
      
      if (rateWidth > rateHeight) {
        s.width  = Math.floor(w)+'px';
        s.height = Math.floor(w*rate)+'px';
      } else {
        s.width  = Math.floor(h/rate)+'px';
        s.height = Math.floor(h)+'px';
      }
    }

    // 一度実行しておく
    _fitFunc();

    // リサイズ時のリスナとして登録しておく
    if (isEver) {
      phina.global.addEventListener('resize', _fitFunc, false);
    }
  }
});

export const BattleApp = nz.BattleApp;
