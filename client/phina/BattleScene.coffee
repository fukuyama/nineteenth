###*
* @file BattleScene.coffee
* 戦闘シーン
###

phina.define 'nz.BattleScene',
  superClass: phina.display.DisplayScene

  # 初期化
  init: (param) ->
    {
      mapid
      mapx
      mapy
    } = param
    @superInit()

    @characters = []

    @mapSprite = nz.MapSprite
      mapid : mapid
      mapx  : mapx
      mapy  : mapy
    @mapSprite.addChildTo @
    @mapSprite.moveTo(
      @gridX.center()
      @gridY.center()
    )
    @on 'canvas.mouseout',     (e) -> @mapSprite?.fire e
    @on 'MapCell.range.ready', (e) -> @mapSprite?.fire e
    return
