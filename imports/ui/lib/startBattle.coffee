@startBattle = (param) ->
  # アプリケーション生成
  @app = nz.BattleApp(param)
  # アプリケーション実行
  @app.run()
  return @app
