
phina.define 'nz.BattleApp',
  superClass: 'phina.game.GameApp'

  init: ->
    @superInit
      query           : '#main'
      title           : 'Nineteenth'
      backgroundColor : 'gray'
      width           : SCREEN_WIDTH
      height          : SCREEN_HEIGHT
      startLabel      : 'battle'
      assets :
        image :
          map_chip : 'img/map_chip.png'
      scenes : [
        label     : 'battle'
        className : 'nz.BattleScene'
      ]
    return

  fitScreen: (isEver = true) ->

    self = @

    _fitFunc = ->
      e = self.canvas.domElement
      r = e.getBoundingClientRect()
      s = e.style

      #s.position = "absolute"
      s.margin   = "auto"
      s.left     = "0px"
      s.top      = "0px"
      s.bottom   = "0px"
      s.right    = "0px"

      # チラつき防止
      # https://drafts.csswg.org/css-images/#the-image-rendering
      s.imageRendering = 'pixelated'

      w = Math.floor(window.innerWidth - 30)
      h = Math.floor(window.innerHeight - r.top - 6)
      w = SCREEN_WIDTH  if w > SCREEN_WIDTH
      h = SCREEN_HEIGHT if h > SCREEN_HEIGHT
      rateWidth  = e.width  / w
      rateHeight = e.height / h
      rate = e.height / e.width
      
      if rateWidth > rateHeight
        s.width  = Math.floor(w)+"px"
        s.height = Math.floor(w*rate)+"px"
      else
        s.width  = Math.floor(h/rate)+"px"
        s.height = Math.floor(h)+"px"
    
    # 一度実行しておく
    _fitFunc()

    # リサイズ時のリスナとして登録しておく
    if isEver
      phina.global.addEventListener("resize", _fitFunc, false)
    return
