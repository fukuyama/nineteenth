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
    } = param
    @superInit(param)

    console.log @characters

    @on 'pointend', (e) ->
      pt = @mapSprite.calcMapXY e.pointer
      console.log 'pointend', pt
      @mapSprite.blink(pt.mapx,pt.mapy)
    return
