###*
* @file BattleStartScene.coffee
* 戦闘開始シーン
###

phina.define 'nz.BattleStartScene',
  superClass: 'phina.display.DisplayScene'

  # 初期化
  init: ->
    @superInit()

    @on 'canvas.mouseout', (e) -> @mapSprite.fire e
    @on 'destroyed',       (e) -> @mapSprite.fire e
    return
