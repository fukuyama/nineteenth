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

    @_chips = {}

    @_initialPosition = phina.geom.Vector2(0, 0)
    @_pointFlag = false
    @_pointChip = null

    @map =
      id  : 1
      x   : 0
      y   : 0
      min : {x:0,y:0}
      max : {x:0,y:0}
    @_firstRun = true

    @on 'canvas.mouseout', ->
      if @_dragFlag
        app.mouse._end()
      return
    return

  refreshMapData: ->
    # 表示Map座標
    mapx = ((@x - SCREEN_WIDTH  / 2) / MAP_CHIP_SIZE).round() + @map.x
    mapy = ((@y - SCREEN_HEIGHT / 2) / MAP_CHIP_SIZE).round() + @map.y
    # Map表示幅(毎回計算？)
    w = (SCREEN_WIDTH  / 2 / MAP_CHIP_SIZE).ceil() + 1
    h = (SCREEN_HEIGHT / 2 / MAP_CHIP_SIZE).ceil() + 1
    # 表示範囲Map座標
    vminx = - mapx - w
    vminy = - mapy - h
    vmaxx = - mapx + w
    vmaxy = - mapy + h
    self = @
    _createMapChips = ->
      self.createMapChips
        vminx : vminx
        vminy : vminy
        vmaxx : vmaxx
        vmaxy : vmaxy
    param = {mapid : @map.id}
    if @_firstRun
      @_firstRun = false
      param.min = {x : vminx, y : vminy}
      param.max = {x : vmaxx, y : vmaxy}
      Meteor.subscribe 'MapCell.range', param, _createMapChips
      @map.min.x = vminx
      @map.min.y = vminy
      @map.max.x = vmaxx
      @map.max.y = vmaxy
      return
    subscribe = false
    if vminx < @map.min.x
      param.min = {x : vminx,          y : @map.min.y}
      param.max = {x : @map.min.x + 1, y : @map.max.y}
      Meteor.subscribe 'MapCell.range', param, _createMapChips
      @map.min.x = vminx
      subscribe = true
    if vminy < @map.min.y
      param.min = {x : @map.min.x, y : vminy         }
      param.max = {x : @map.max.x, y : @map.min.y + 1}
      Meteor.subscribe 'MapCell.range', param, _createMapChips
      @map.min.y = vminy
      subscribe = true
    if @map.max.x < vmaxx
      param.min = {x : @map.max.x - 1, y : @map.min.y}
      param.max = {x : vmaxx,          y : @map.max.y}
      Meteor.subscribe 'MapCell.range', param, _createMapChips
      @map.max.x = vmaxx
      subscribe = true
    if @map.max.y < vmaxy
      param.min = {x : @map.min.x, y : @map.max.y - 1}
      param.max = {x : @map.max.x, y : vmaxy         }
      Meteor.subscribe 'MapCell.range', param, _createMapChips
      @map.max.y = vmaxy
      subscribe = true
    unless subscribe
      _createMapChips()

  createMapChips: (param) ->
    {
      vmaxx
      vminx
      vmaxy
      vminy
    } = param
    MapCell.find(
      mapid : @map.id
      mapx  :
        $lt : vmaxx
        $gt : vminx
      mapy  :
        $lt : vmaxy
        $gt : vminy
    ).forEach @createMapChip.bind @
    return

  createMapChip: (param) ->
    {
      index
      mapx
      mapy
    } = param
    return @_chips[mapx][mapy] if @_chips[mapx]?[mapy]?
    w = h = MAP_CHIP_SIZE
    x = (mapx + @map.x) * w
    y = (mapy + @map.y) * h
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
    return chip

  _chipPointStart: (e) ->
    @_initialPosition.x = @x
    @_initialPosition.y = @y
    @_pointFlag = true
    @_pointChip = e.target
    return

  _chipPointOver: (e) ->
    return

  _chipPointMove: (e) ->
    if @_pointFlag
      @x += e.pointer.dx
      @y += e.pointer.dy
      @refreshMapData()
      @_dragFlag = true
    return

  _chipPointOut: (e) ->
    return

  _chipPointEnd: (e) ->
    if @_dragFlag
      @refreshMapData()
    @_pointFlag = false
    @_dragFlag  = false
    @_pointChip = null
    return
