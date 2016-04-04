###*
* @file BattleStartScene.coffee
* 戦闘開始シーン
###

phina.define 'nz.BattleStartScene',
  superClass: 'phina.display.DisplayScene'

  # 初期化
  init: (param) ->
    @superInit(param)

    @on 'pointend', ->
      console.log 'pointend'
      @exit()
    return
