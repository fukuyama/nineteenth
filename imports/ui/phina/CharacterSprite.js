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
  }

  setMapPosition: (mapx,mapy) ->
    pos = @parent.getMapPosition mapx,mapy
    @moveTo pos.x, pos.y

  changeColor: (image,changes) ->
    image.filter(@_createColorFilter(c.from, c.to) for c in changes)

  _createColorFilter: (a,b) ->
    if b.length is 3
      return (pixel, index, x, y, imageData) ->
        if pixel[0] is a[0] and pixel[1] is a[1] and pixel[2] is a[2]
          imageData.data[index+0] = b[0]
          imageData.data[index+1] = b[1]
          imageData.data[index+2] = b[2]
    if a.length is 4 and b.length is 4
      return (pixel, index, x, y, imageData) ->
        if pixel[0] is a[0] and pixel[1] is a[1] and pixel[2] is a[2] and pixel[3] is a[3]
          imageData.data[index+0] = b[0]
          imageData.data[index+1] = b[1]
          imageData.data[index+2] = b[2]
          imageData.data[index+3] = b[3]
    return undefined
});
