fitScreen = (isEver) ->
  isEver = isEver ? true
  self = @
  _fitFunc = ->
    e = self.domElement
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

    w = Math.floor(window.innerWidth - r.left - 20)
    h = Math.floor(window.innerHeight - r.top - 6)
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

@startBattle = ->
  config = {
    query  : '#main'
    title  : 'Nineteenth'
    fit    : false # TODO:fitメソッドをオリジナルで作らないと
    width  : 640
    height : 480
  }
  #config.$safe
  #  title: nz.system.title
  #  assets: nz.system.assets
  #config.$safe nz.system.screen

  run = (scenes) ->
    # アプリケーション生成
    app = phina.display.CanvasApp(config)
    app.canvas.fitScreen = fitScreen
    app.canvas.fitScreen()

    # シーン設定
    app.replaceScene phina.game.ManagerScene scenes: scenes

    # アプリケーション実行
    app.run()
    return

  scene = (label, param) ->
    if param.arguments?
      param.arguments.$safe config
    param.$safe
      label:     label
      arguments: config
      nextLabel: 'splash'

  run [
    scene 'title',
      className : 'TitleScene'
      nextLabel : 'main'
    scene 'main',
      className : 'MainScene'
  ]

  return
