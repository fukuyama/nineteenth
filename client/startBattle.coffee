@startBattle = ->
  config = {
    query : '#main'
    title : 'Nineteenth'
    fit   : false # TODO:fitメソッドをオリジナルで作らないと
  }
  #config.$safe
  #  title: nz.system.title
  #  assets: nz.system.assets
  #config.$safe nz.system.screen

  run = (scenes) ->
    # アプリケーション生成
    app = phina.display.CanvasApp(config)

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
