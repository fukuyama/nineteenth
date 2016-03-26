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

    @next @start_phase
    return

  next: (fn) -> @update = fn

  scene_phase : (scene, next) ->
    scene.addChild @mapSprite
    self = @
    scene.on 'exit', ->
      self.next next
      self.addChild self.mapSprite
    @app.pushScene scene
    @update = null
    return

  start_phase : ->
    @next @map_load_phase
    return

  map_load_phase : ->
    if @mapSprite.mapReady()
      @next @character_load_phase
    return

  character_load_phase : ->
    if @app.isReady('Characters.group')
      self = @
      Characters.group.find(group : {$in : @groups}).forEach (character) ->
        type = CharacterTypes.findOne character.type
        self.characters.push nz.CharacterSprite
          character : character
          type : type
      @next @setup_position_phase
    return

  setup_position_phase : ->
    scene = nz.BattlePositionScene
      width      : @width
      height     : @height
      groups     : @groups
      mapSprite  : @mapSprite
      characters : @characters
      mapx       : @mapx
      mapy       : @mapy
    @scene_phase scene, @start_turn
    return

  start_turn : ->
    @next null
    return

