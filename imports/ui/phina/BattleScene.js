/***
 * @file BattleScene.coffee
 * 戦闘シーン
 */

phina.define('nz.BattleScene',{
  superClass: 'phina.display.DisplayScene',

  // 初期化
  init (param) {
    this.superInit(param);

    this.characters = [];

    this.mapSprite = nz.MapSprite({
      mapId : param.mapId,
      mapx  : param.mapx,
      mapy  : param.mapy
    })
    .addChildTo(this)
    .moveTo(
      this.gridX.center(),
      this.gridY.center()
    );
    /*
    @on 'canvas.mouseout', (e) ->
      @mapSprite.fire e
    @on 'destroyed',       (e) ->
      @mapSprite.fire e

    @next @start_phase
    */
  },

  next (fn) {
    this.update = fn;
  },

  scene_phase (scene) {
    scene.addChild(this.mapSprite);
    scene.on('exit', () => {
      this.addChild(this.mapSprite);
    });
    this.app.pushScene(scene);
    this.update = null;
    return {
      next : (fn) => {
        scene.on('exit', () => {
          this.next(fn);
        });
      }
    };
  },

  start_phase () {
    this.next(this.map_load_phase);
  },

  map_load_phase () {
    if (this.mapSprite.mapReady()) {
      this.next(this.character_load_phase);
    }
  },

  /*
  character_load_phase () {
    if @app.isReady('Characters.Group')
      self = @
      Characters.Group.find(group : {$in : @groups}).forEach (character) ->
        type = CharacterTypes.findOne character.type
        self.characters.push nz.CharacterSprite
          character : character
          type : type
      @next @setup_position_phase
  },
  */

  setup_position_phase () {
    const scene = nz.BattlePositionScene({
      width      : this.width,
      height     : this.height,
      groups     : this.groups,
      mapSprite  : this.mapSprite,
      characters : this.characters,
      mapx       : this.mapx,
      mapy       : this.mapy
    });
    this.scene_phase(scene).next(this.start_turn);
  },

  start_turn () {
    console.log('start_turn');
    this.next(null);
  }
});
