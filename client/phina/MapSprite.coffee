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

    @map =
      id : 1
      x  : 0
      y  : 0
    return

  refreshMapData: ->
    mapx = ((@x - SCREEN_WIDTH  / 2) / MAP_CHIP_SIZE).round() + @map.x
    mapy = ((@y - SCREEN_HEIGHT / 2) / MAP_CHIP_SIZE).round() + @map.y
    w = (SCREEN_WIDTH  / 2 / MAP_CHIP_SIZE).ceil() + 1
    h = (SCREEN_HEIGHT / 2 / MAP_CHIP_SIZE).ceil() + 1
    minx = - mapx - w
    miny = - mapy - h
    maxx = - mapx + w
    maxy = - mapy + h
    mapid = @map.id
    # TODO: 最大値最小値を記録しよう！
    self = @
    #Meteor.subscribe 'MapCell.map', {mapid:@map.id}
    Meteor.subscribe 'MapCell.range', {
      mapid : mapid
      min   : {x : minx, y : miny}
      max   : {x : maxx, y : maxy}
    }, ->
      count = 0
      MapCell.find(
        mapid : mapid
        mapx  :
          $lt : maxx
          $gt : minx
        mapy  :
          $lt : maxy
          $gt : miny
      ).forEach (cell) ->
        count += 1
        self.createMapChip cell
      console.log count
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
      if @_dragFlag
        @refreshMapData()
    return

  _chipPointOut: (e) ->
    return

  _chipPointEnd: (e) ->
    @_pointFlag = false
    @_dragFlag  = false
    @_pointChip = null
    return
