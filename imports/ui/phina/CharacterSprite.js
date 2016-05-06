/***
 * @file CharacterSprite.js
 * キャラクタースプライト
 */

import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  MAP_CHIP_SIZE
} from '/imports/ui/lib/constants.js';

phina.define('nz.CharacterSprite', {
  superClass : 'phina.display.DisplayElement',

  // 初期化
  init(param) {
    const image       = param.type.image;
    const spriteSheet = param.type.spriteSheet;

    this.name = param.character.name;
    
    this.superInit();
    this.setInteractive(true);

    this.sprite = phina.display.Sprite(image,MAP_CHIP_SIZE,MAP_CHIP_SIZE);
    this.sprite.image = this.changeColor(this.sprite.image.clone(),[{
      from : [255,255,255],
      to   : [0,0,0]
    }]);

    this.frame = phina.accessory.FrameAnimation(spriteSheet)
      .attachTo(this.sprite)
      .gotoAndStop('down');

    this.sprite.addChildTo(this);
  },

  setMapPosition(mapx,mapy) {
    const pos = this.parent.getMapPosition(mapx,mapy);
    this.moveTo(pos.x, pos.y);
  },

  changeColor(image,changes) {
    changes.forEach( (c) => {
      image.filter(this._createColorFilter(c.from, c.to));
    });
    return image;
  },

  _createColorFilter(a,b) {
    if (b.length === 3) {
      return function (pixel, index, x, y, imageData) {
        if (pixel[0] === a[0] && pixel[1] === a[1] && pixel[2] === a[2]) {
          imageData.data[index + 0] = b[0];
          imageData.data[index + 1] = b[1];
          imageData.data[index + 2] = b[2];
        }
      };
    }
    if (a.length === 4 && b.length === 4) {
      return function (pixel, index, x, y, imageData) {
        if (pixel[0] === a[0] && pixel[1] === a[1] && pixel[2] === a[2] && pixel[3] === a[3]) {
          imageData.data[index + 0] = b[0];
          imageData.data[index + 1] = b[1];
          imageData.data[index + 2] = b[2];
          imageData.data[index + 3] = b[3];
        }
      };
    }
    return undefined;
  }
});
