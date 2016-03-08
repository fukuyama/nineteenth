###*
* @file BattleScene.coffee
* 戦闘シーン
###

phina.define 'nz.BattleScene',
  superClass: phina.display.DisplayScene

  # 初期化
  init: (param) ->
    @superInit param

    @map = nz.MapSprite().addChildTo @

    @map.x = @gridX.center()
    @map.y = @gridY.center()
    @map.refreshMapData()

    return
