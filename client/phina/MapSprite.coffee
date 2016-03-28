###*
* @file MapSprite.coffee
* 戦闘マップスプライト
###

phina.define 'nz.MapSprite',
  superClass: 'phina.display.DisplayElement'

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

    @_chips  = {}
    @_blinks = {}

    @_initialPosition = phina.geom.Vector2(0, 0)
    @_pointFlag = false
    @_pointChip = null
    @_mapReady  = false

    @_range =
      min : {x:0,y:0}
      max : {x:0,y:0}
    @_firstRun = true
    @_handlers = []

    @on 'canvas.mouseout', ->
      if @_dragFlag
        app.mouse._end()
      return
    @on 'destroyed', ->
      @unsubscribeMapCell(true)
      return
    return

  currentMapXY : -> @calcMapXY(@x,@y)
  calcMapXY : (x,y) ->
    if typeof x is 'object'
      {
        x
        y
      } = x
    mapx = ((x - SCREEN_WIDTH  / 2) / MAP_CHIP_SIZE).round() + @mapx
    if Math.abs(mapx % 2) == 1
      y -= MAP_CHIP_SIZE / 2
    mapy = ((y - SCREEN_HEIGHT / 2) / MAP_CHIP_SIZE).round() + @mapy
    {mapx:mapx,mapy:mapy}

  subscribeMapCell: (param) ->
    self = @
    @_handlers.push Meteor.subscribe 'MapCell.range', param,
      onReady : ->
        self.createMapChips(param)
  unsubscribeMapCell: (force=false)->
    handlers = @_handlers.clone()
    if force
      handlers.forEach (h) -> h.stop()
    else
      self = @
      setTimeout(
        () ->
          if self._dragFlag
            handlers.forEach (h) -> self._handlers.push h
          else
            handlers.forEach (h) -> h.stop()
        20000
      )
    @_handlers.clear()

  moveTo: (x,y) ->
    @x = x
    @y = y
    @refreshMap()
    @

  refreshMap: ->
    # 表示Map座標
    {
      mapx
      mapy
    } = @currentMapXY()
    # 表示範囲Map座標
    vminx = - mapx - @mapw
    vminy = - mapy - @maph
    vmaxx = - mapx + @mapw
    vmaxy = - mapy + @maph
    param = {
      mapid : @mapid
      min : {x : vminx, y : vminy}
      max : {x : vmaxx, y : vmaxy}
    }
    if @_firstRun
      @_firstRun = false
      param.min = {x : vminx, y : vminy}
      param.max = {x : vmaxx, y : vmaxy}
      @subscribeMapCell param
      @_range.min.x = vminx
      @_range.min.y = vminy
      @_range.max.x = vmaxx
      @_range.max.y = vmaxy
      return
    subscribe = false
    if vminx < @_range.min.x
      param.min = {x : vminx,             y : @_range.min.y}
      param.max = {x : @_range.min.x + 1, y : @_range.max.y}
      @subscribeMapCell param
      @_range.min.x = vminx
      subscribe = true
    if vminy < @_range.min.y
      param.min = {x : @_range.min.x, y : vminy            }
      param.max = {x : @_range.max.x, y : @_range.min.y + 1}
      @subscribeMapCell param
      @_range.min.y = vminy
      subscribe = true
    if @_range.max.x < vmaxx
      param.min = {x : @_range.max.x - 1, y : @_range.min.y}
      param.max = {x : vmaxx,             y : @_range.max.y}
      @subscribeMapCell param
      @_range.max.x = vmaxx
      subscribe = true
    if @_range.max.y < vmaxy
      param.min = {x : @_range.min.x, y : @_range.max.y - 1}
      param.max = {x : @_range.max.x, y : vmaxy            }
      @subscribeMapCell param
      @_range.max.y = vmaxy
      subscribe = true
    # TODO: 広げすぎたら消したいかも。ためしに、まずは、childrenからのみ除外で、必要な部分のみ追加する感じに
    unless subscribe
      @createMapChips(param)
    @

  createMapChips: (param) ->
    # 表示範囲Map座標
    MapCell.range.find(
      mapid : param.mapid
      mapx  :
        $gt : param.min.x
        $lt : param.max.x
      mapy  :
        $gt : param.min.y
        $lt : param.max.y
    ).forEach @createMapChip.bind @
    @_mapReady = true
    @parent?.flare 'map.refreshed'
    return

  mapReady: -> @_mapReady

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

  blink: (mapx,mapy) ->
    if @_blinks[mapx]?[mapy]?
      return
    w = h = MAP_CHIP_SIZE
    pt = @getMapPosition(mapx,mapy)
    return unless pt?
    {x,y} = pt
    blink = phina.display.RectangleShape(
      width  : w
      height : h
      strokeStyle : 'white'
      fillStyle   : 'white'
    )
      .addChildTo(@)
      .setPosition(x,y)
      .setInteractive(true)
      .setVisible(true)

    blink.tweener.clear().fade(0.5,300).fade(0.1,300).setLoop(true)
    @_blinks[mapx] = [] unless @_blinks[mapx]?
    @_blinks[mapx][mapy] = blink
    return

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
    console.log 'pointend', {
      mapx : e.target.mapx
      mapy : e.target.mapy
    }
    if @_dragFlag
      @unsubscribeMapCell()
    @_pointFlag = false
    @_dragFlag  = false
    @_pointChip = null
    return

  getMapPosition: (mapx,mapy) ->
    @_chips[mapx]?[mapy]?.position
