###*
* @file MapSprite.coffee
* 戦闘マップスプライト
###

MapCell = new Mongo.Collection 'MapCell'

phina.define 'nz.MapSprite',
  superClass: phina.display.DisplayElement

  # 初期化
  init: () ->
    @superInit()
    @setMapData
      mapid : 1
      mapx  : 0
      mapy  : 0
    return

  setMapData: (map) ->
    self = @
    Meteor.subscribe 'MapCell', map, ->
      MapCell.find().forEach (cell) ->
        self.createMapChip cell
    return

  createMapChip: (param) ->
    {
      index
      mapx
      mapy
    } = param
    w = h = MAP_CHIP_SIZE
    x = mapx * w
    y = mapy * h
    if Math.abs(mapx % 2) == 1
      y += h / 2
    phina.display.Sprite('map_chip',w,h)
      .addChildTo(@)
      .setPosition(x,y)
      .setFrameIndex(index,w,h)
      .setInteractive(true)
      .setBoundingType('rect')
      .on 'pointingstart', @_dispatchMapChipEvent
      .on 'pointingover' , @_dispatchMapChipEvent
      .on 'pointingout'  , @_dispatchMapChipEvent
      .on 'pointingend'  , @_dispatchMapChipEvent

  _dispatchMapChipEvent: (e) ->
    return
