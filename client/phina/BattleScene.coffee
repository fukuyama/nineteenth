###*
* @file BattleScene.coffee
* 戦闘シーン
###

phina.define 'nz.BattleScene',
  superClass: 'phina.display.DisplayScene'

  # 初期化
  init: (param) ->
    {
      mapid
      mapx
      mapy
      groups
    } = param
    console.log 'groups',groups
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

    @on 'canvas.mouseout', (e) ->
      @mapSprite.fire e
    @on 'destroyed',       (e) ->
      @mapSprite.fire e
    if app.isReady('Characters.group')
      console.log 'Characters.group.ready'
      Characters.group.find(group : {$in : groups}).forEach (character) ->
        console.log character
    else
      @on 'Characters.group.ready', (e) ->
        console.log 'Characters.group.ready'
        Characters.group.find(group : {$in : groups}).forEach (character) ->
          console.log character

    return
