###*
* @file BattleScene.coffee
* 戦闘シーン
###

phina.define 'nz.BattleScene',
  superClass: phina.display.DisplayScene

  # 初期化
  init: (param) ->
    @superInit param

    console.log Session.get 'map'

    @map = nz.MapSprite().addChildTo @

    @map.x = @gridX.span 1
    @map.y = @gridY.span 1
