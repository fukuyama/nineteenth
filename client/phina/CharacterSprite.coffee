###*
* @file CharacterSprite.coffee
* キャラクタースプライト
###

phina.define 'nz.SpriteCharacter',
  superClass: phina.display.DisplayElement

  # 初期化
  init: () ->
    #@frame = phina.accessory.FrameAnimation @character.spriteSheet
    #fm = @frame.ss.getFrame 0
    #phina.display.Sprite(@character.image,fm.width,fm.height
    #@attach @frame
