FlowRouter.route '/battle',
  name : 'battle'
  subscriptions : (param) ->
    console.log 'subscriptions'
    @register 'Groups.owner', Meteor.subscribe('Groups.owner', param)
    return
  action : ->
    console.log 'action'
    BlazeLayout.render 'main',
      content : 'battle'
    return

Template.battle.onRendered ->
  # アプリケーション生成
  #@app = nz.BattleApp()
  # アプリケーション実行
  #@app.run()
  return

$(document).on 'mouseout', '.battle-canvas', ->
  app?.flare 'canvas.mouseout'
  return
