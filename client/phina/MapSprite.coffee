###*
* @file MapSprite.coffee
* 戦闘マップスプライト
###

phina.define 'nz.MapSprite',
  superClass: phina.display.DisplayElement

  # 初期化
  init: (param) ->
    {
      @mapid
      @mapx
      @mapy
    } = param
    @mapw = (SCREEN_WIDTH  / 2 / MAP_CHIP_SIZE).ceil() + 1
    @maph = (SCREEN_HEIGHT / 2 / MAP_CHIP_SIZE).ceil() + 1
    @superInit()
    @setInteractive(true)

    @_chips = {}

    @_initialPosition = phina.geom.Vector2(0, 0)
    @_pointFlag = false
    @_pointChip = null

    @_range =
      min : {x:0,y:0}
      max : {x:0,y:0}
    @_firstRun = true

    @on 'canvas.mouseout', ->
      if @_dragFlag
        app.mouse._end()
      return
    @on 'MapCell.range.ready', (e) ->
      console.log 'MapCell.range.ready'
      @refreshMapData()
      return
    return

  currentMapX : -> ((@x - SCREEN_WIDTH  / 2) / MAP_CHIP_SIZE).round() + @mapx
  currentMapY : -> ((@y - SCREEN_HEIGHT / 2) / MAP_CHIP_SIZE).round() + @mapy

  setMapCellRangeParam: (param) ->
    app.setMapCellRangeParam param

  moveTo: (x,y) ->
    @x = x
    @y = y
    # 表示Map座標
    mapx = @currentMapX()
    mapy = @currentMapY()
    # 表示範囲Map座標
    vminx = - mapx - @mapw
    vminy = - mapy - @maph
    vmaxx = - mapx + @mapw
    vmaxy = - mapy + @maph
    param = {}
    if @_firstRun
      @_firstRun = false
      param.min = {x : vminx, y : vminy}
      param.max = {x : vmaxx, y : vmaxy}
      @setMapCellRangeParam param
      @_range.min.x = vminx
      @_range.min.y = vminy
      @_range.max.x = vmaxx
      @_range.max.y = vmaxy
      return
    if vminx < @_range.min.x
      param.min = {x : vminx,             y : @_range.min.y}
      param.max = {x : @_range.min.x + 1, y : @_range.max.y}
      @setMapCellRangeParam param
      @_range.min.x = vminx
    if vminy < @_range.min.y
      param.min = {x : @_range.min.x, y : vminy            }
      param.max = {x : @_range.max.x, y : @_range.min.y + 1}
      @setMapCellRangeParam param
      @_range.min.y = vminy
    if @_range.max.x < vmaxx
      param.min = {x : @_range.max.x - 1, y : @_range.min.y}
      param.max = {x : vmaxx,             y : @_range.max.y}
      @setMapCellRangeParam param
      @_range.max.x = vmaxx
    if @_range.max.y < vmaxy
      param.min = {x : @_range.min.x, y : @_range.max.y - 1}
      param.max = {x : @_range.max.x, y : vmaxy            }
      @setMapCellRangeParam param
      @_range.max.y = vmaxy
    # TODO: 広げすぎたら消したいかも。ためしに、まずは、childrenからのみ除外で、必要な部分のみ追加する感じに
    @

  refreshMapData: ->
    # 表示Map座標
    mapx = @currentMapX()
    mapy = @currentMapY()
    # 表示範囲Map座標
    MapCell.range.find(
      mapid : @mapid
      mapx  :
        $gt : - mapx - @mapw
        $lt : - mapx + @mapw
      mapy  :
        $gt : - mapy - @maph
        $lt : - mapy + @maph
    ).forEach ((param) ->
        console.log 'forEach'
        @createMapChip(param)).bind @
    console.log 'refreshMapData'
    @parent?.flare 'map.refreshed'
    return

  createMapChip: (param) ->
    {
      index
      mapx
      mapy
    } = param
    return @_chips[mapx][mapy] if @_chips[mapx]?[mapy]?
    w = h = MAP_CHIP_SIZE
    x = (mapx + @mapx) * w
    y = (mapy + @mapy) * h
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
      @_dragFlag = true
      @moveTo(
        @x + e.pointer.dx
        @y + e.pointer.dy
      )
    return

  _chipPointOut: (e) ->
    return

  _chipPointEnd: (e) ->
    @_pointFlag = false
    @_dragFlag  = false
    @_pointChip = null
    return

  getMapPosition: (mapx,mapy) ->
    @_chips[mapx]?[mapy]?.position
