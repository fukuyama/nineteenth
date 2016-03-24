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
      @groups
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

    @_phase = {}
    for nm, fn of @phase
      @_phase[nm] = fn

    @next 'start'
    return

  next: (name='null') ->
    if @_phase[name]?
      console.log 'phase',name
      @update = @_phase[name]
    else
      if name isnt 'null'
        console.error 'phase not found.',name
      @update = null

  scenePhase: (scene, next) ->
    scene.addChild @mapSprite
    self = @
    scene.on 'exit', ->
      self.next next
      self.addChild self.mapSprite
    @app.pushScene scene
    @update = null
    return

  phase:
    'start' : ->
      @next 'map load'
      return

    'map load' : ->
      if @mapSprite.mapReady()
        @next 'character load'
      return

    'character load' : ->
      if @app.isReady('Characters.group')
        self = @
        Characters.group.find(group : {$in : @groups}).forEach (character) ->
          type = CharacterTypes.findOne character.type
          self.characters.push nz.CharacterSprite
            character : character
            type : type
        @next 'setup position'
      return

    'blink test' : ->
      @mapSprite.blink(0,0)
      @mapSprite.blink(0,1)
      @mapSprite.blink(1,1)
      @next
      return

    'setup position' : ->
      scene = nz.BattlePositionScene
        width      : @width
        height     : @height
        groups     : @groups
        mapSprite  : @mapSprite
        characters : @characters
      @scenePhase scene, 'start turn'
      return
