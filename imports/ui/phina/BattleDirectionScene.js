/***
 * @file BattleDirectionScene.js
 * 向き設定シーン
 */

phina.define('nz.BattleDirectionScene', {
  superClass : 'nz.BattleRotatePointerScene',

  // 初期化
  init(param) {
    this.superInit(param);

    this.on('enter', () => {
      console.log('BattleDirectionScene enter');
    });

    this.on('exit', () => {
      console.log('BattleDirectionScene exit');
    });
  },

  _movePointer(pointer) {
    console.log('_movePointer',pointer.position);
  }
  /*
  _rotatePointer(rotation) {
    return unless @pointer?
    rotation = nz.utils.normalizRotation rotation
    for d,i in DIRECTIONS when 0 <= i and i < 6
      if d.rotation - 30 <= rotation and rotation <= d.rotation + 30
        costd = nz.Graph.directionCost(@target.direction, d.index)
        if costd <= @_remnant
          if @_direction != d.index
            @_direction = d.index
            @pointer.rotation = d.rotation
            @_keyRotate = d.rotation
            return
    @_keyRotate = DIRECTIONS[@_direction].rotation
  }

  _movePointer: (pointing) ->
    return unless @pointer?
    t = @target.body.localToGlobal tm.geom.Vector2(0,0)
    x = pointing.x - t.x
    y = pointing.y - t.y
    v = tm.geom.Vector2 x,y
    @_rotatePointer Math.radToDeg v.toAngle()
    return
  */
});
