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

    @characters = []


    @one 'map.refreshed', (e) ->
      c = nz.CharacterSprite().addChildTo @map
      c.setMapPosition(0,0)
      @characters.push c
      console.log 'map.refreshed'
      return
    @on 'canvas.mouseout', (e) ->
      @map.fire e
      return
    return
