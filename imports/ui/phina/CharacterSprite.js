/***
 * @file CharacterSprite.coffee
 * キャラクタースプライト
 */

phina.define('nz.CharacterSprite', {
  superClass : 'phina.display.DisplayElement',

  // 初期化
  init(param) {
    this.name = param.character.name;
    {
      image
      spritesheet
    } = param.type
    this.superInit();
    this.setInteractive(true);

    @sprite = phina.display.Sprite(image,MAP_CHIP_SIZE,MAP_CHIP_SIZE)
    @sprite.image = @changeColor @sprite.image.clone(),[{
      from : [255,255,255]
      to   : [0,0,0]
    }]

    @frame = phina.accessory.FrameAnimation(spritesheet).attachTo(@sprite).gotoAndStop('down')

    @sprite.addChildTo @
  },

  setMapPosition(mapx,mapy) {
    const pos = @parent.getMapPosition(mapx,mapy);
    this.moveTo(pos.x, pos.y);
  },

  changeColor(image,changes) {
    for (let c in changes) {
      image.filter(this._createColorFilter(c.from, c.to));
    }
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
