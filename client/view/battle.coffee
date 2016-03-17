
FlowRouter.route '/battle',
  name : 'battle'
  subscriptions : (param) ->
    console.log 'subscriptions'
    # リアクティブじゃない、サーバーからのみ送られる物はここでサブスクライブする感じ
    return
  action : ->
    console.log 'action'
    BlazeLayout.render 'main',
      content : 'battle'
    return

# リアクティブな物は、Template.instance().autorun でサブスクライブさせる
Template.battle.onRendered ->
  startBattle
    mapid : 1
    mapx  : 0
    mapy  : 0
  ins = @
  ins.autorun ->
    console.log 'autorun'
    ins.subscribe 'MapCell.range', app.getMapCellRangeParam(),
      onReady : -> app?.flare 'MapCell.range.ready'
  return

Template.battle.helpers

$(document).on 'mouseout', '.battle-canvas', ->
  app?.flare 'canvas.mouseout'
  return
