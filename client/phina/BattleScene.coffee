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
    @superInit(param)

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

    @phase 'null', ->
      return
    @phase 'character load', ->
      if @app.isReady('Characters.group')
        self = @
        Characters.group.find(group : {$in : groups}).forEach (character) ->
          type = CharacterTypes.findOne character.type
          self.characters.push nz.CharacterSprite
            character : character
            type : type
        @next 'null'
      return
    @phase 'blink test', ->
      if @mapSprite.mapReady()
        @mapSprite.blink(0,0)
        @mapSprite.blink(0,1)
        @mapSprite.blink(1,1)
        @next 'null'
      return

    @next 'character load'
    return

  phase: (name,update) ->
    @_phase = @_phase ? {}
    @_phase[name] = update

  next: (name) ->
    if @_phase[name]?
      @update = @_phase[name]    
    else
      console.error 'phase not found.',name
