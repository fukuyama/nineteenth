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
    @setInteractive(true)

    @initialPosition = phina.geom.Vector2(0, 0)
    @_pointFlag = false

    @_chips = {}
    @_pointChip = null

    @setMapData
      mapid : 1
      mapx  : 0
      mapy  : 0
    return

  setMapData: (map) ->
    {
      @mapid
      @mapx
      @mapy
    } = map
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
    return @_chips[mapx][mapy] if @_chips[mapx]?[mapy]?
    w = h = MAP_CHIP_SIZE
    x = mapx * w
    y = mapy * h
    if Math.abs(mapx % 2) == 1
      y += h / 2
    chip = phina.display.Sprite('map_chip',w,h)
      .addChildTo(@)
      .setPosition(x,y)
      .setFrameIndex(index,w,h)
      .setInteractive(true)
      .setBoundingType('rect')
      .on 'pointstart', @_chipPointStart.bind @
      .on 'pointover' , @_chipPointOver.bind @
      .on 'pointmove' , @_chipPointMove.bind @
      .on 'pointout'  , @_chipPointOut.bind @
      .on 'pointend'  , @_chipPointEnd.bind @
    chip.mapx = mapx
    chip.mapy = mapy
    @_chips[mapx] = {} unless @_chips[mapx]?
    @_chips[mapx][mapy] = chip
    chip

  _chipPointStart: (e) ->
    @initialPosition.x = @x
    @initialPosition.y = @y
    @_pointFlag = true
    @_pointChip = e.target
    return

  _chipPointOver: (e) ->
    return

  _chipPointMove: (e) ->
    if @_pointFlag
      @x += e.pointer.dx
      @y += e.pointer.dy
      @_dragFlag = true
    return

  _chipPointOut: (e) ->
    return

  _chipPointEnd: (e) ->
    if @_dragFlag
      dx = ((@x - @initialPosition.x) / MAP_CHIP_SIZE).round()
      dy = ((@y - @initialPosition.y) / MAP_CHIP_SIZE).round()
      @setMapData
        mapid : @mapid
        mapx  : @mapx - dx
        mapy  : @mapy - dy
    @_pointFlag = false
    @_dragFlag  = false
    @_pointChip = null
    return
