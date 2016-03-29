###*
* @file BattlePositionScene.coffee
* 戦闘開始シーン
###

phina.define 'nz.BattlePositionScene',
  superClass: 'phina.display.DisplayScene'

  # 初期化
  init: (param) ->
    {
      @characters
      @mapSprite
      @mapx
      @mapy
    } = param
    @superInit(param)

    @on 'pointend', (e) ->
      pos = @mapSprite.calcMapXY e.pointer
      l = @calcDistanceAddress(pos,3)
      for a in l
        @mapSprite.blink(a.mapx,a.mapy)
      @exit()
    return

  calcDistanceAddress: (pos,distance) ->
    {
      mapx
      mapy
    } = pos
    l = []
    for x in [mapx - distance .. mapx + distance]
      for y in [mapy - distance .. mapy + distance]
        p1 = {mapx:x,mapy:y}
        if nz.Graph.direction(pos,p1) is distance
          l.push p1
    return l
