
@nz = nz = @nz ? {}

class nz.Graph

  ###* コンストラクタ.
  * @classdesc A*用グラフクラス
  * @constructor nz.Graph
  ###
  constructor: (param = {}) ->
    return

###* 距離
* @param {Object} c1 元(mapx,mapy)
* @param {Object} c2 対象(mapx,mapy)
###
nz.Graph.distance = (c1,c2) ->
  hx = Math.abs(c1.mapx - c2.mapx)
  hy = Math.abs(c1.mapy - c2.mapy)
  hr = Math.ceil(hx / 2)
  if hy < hr
    return hx
  if hx % 2 == 1
    if c1.mapx % 2 == 0
      if c1.mapy <= c2.mapy
        hy += 1
    else
      if c1.mapy >= c2.mapy
        hy += 1
  return hx + hy - hr

nz.Graph.pos2mapXY = (x,y) ->
  if typeof x is 'object'
    {
      x
      y
    } = x
  mapx = ((x - SCREEN_WIDTH  / 2) / MAP_CHIP_SIZE).round()
  if Math.abs(mapx % 2) == 1
    y -= MAP_CHIP_SIZE / 2
  mapy = ((y - SCREEN_HEIGHT / 2) / MAP_CHIP_SIZE).round()
  {mapx:mapx,mapy:mapy}

nz.Graph.mapXY2pos = (mapx,mapy) ->
    w = h = MAP_CHIP_SIZE
    x = mapx * w
    y = mapy * h
    if Math.abs(mapx % 2) == 1
      y += h / 2
    {x:x,y:y}

nz.Graph.neighborMapXY = (mapx,mapy) ->
  l = []
  return l
