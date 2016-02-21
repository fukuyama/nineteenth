
phina.asset.AssetLoader.assetLoadFunctions.json = (key, path) ->
  file = phina.asset.File()
  return file.load
    path: path
    dataType: 'json'

phina.globalize()

# メイン処理(ページ読み込み後に実行される)
phina.main ->
  config = {
    query : '#main'
    title : 'Nineteenth'
    fit   : false # TODO:オリジナルで作らないと
  }
  #config.$safe
  #  title: nz.system.title
  #  assets: nz.system.assets
  #config.$safe nz.system.screen

  run = (scenes) ->
    # アプリケーション生成
    app = CanvasApp(config)

    # シーン設定
    app.replaceScene ManagerScene scenes: scenes

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
