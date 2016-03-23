###*
* @file BattlePositionScene.coffee
* 戦闘開始シーン
###

phina.define 'nz.BattlePositionScene',
  superClass: 'phina.display.DisplayScene'

  # 初期化
  init: (param) ->
    {
      @characters
    } = param
    @superInit(param)

    console.log @characters

    @on 'pointend', ->
      console.log 'pointend'
      @exit()
    return
