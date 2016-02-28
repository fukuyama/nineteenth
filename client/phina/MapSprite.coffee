###*
* @file MapSprite.coffee
* 戦闘マップスプライト
###

phina.define 'nz.MapSprite',
  superClass: phina.display.DisplayElement

  # 初期化
  init: () ->
    @superInit()

    @createMapChip(1)

    return

  createMapChip: (i=0,x=0,y=0) ->
    w = h = MAP_CHIP_SIZE
    phina.display.Sprite('map_chip',w,h)
      .addChildTo(@)
      .setPosition(x,y)
      .setFrameIndex(i,w,h)
      .setInteractive(true)
      .setBoundingType('rect')
      .on 'pointingstart', @_dispatchMapChipEvent
      .on 'pointingover' , @_dispatchMapChipEvent
      .on 'pointingout'  , @_dispatchMapChipEvent
      .on 'pointingend'  , @_dispatchMapChipEvent

  _dispatchMapChipEvent: (e) ->
    return
