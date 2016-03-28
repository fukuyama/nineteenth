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
      pt = @mapSprite.calcMapXY e.pointer
      console.log 'pointend', pt
      l = @calcDistanceAddress(pt.mapx,pt.mapy,5)
      for a in l
        @mapSprite.blink(a[0],a[1])
      @exit()
    return

  calcDistanceAddress: (mapx,mapy,distance) ->
    l = []
    for x in [mapx - distance .. mapx + distance]
      for y in [mapy - distance .. mapy + distance]
        l.push [x,y]
    return l