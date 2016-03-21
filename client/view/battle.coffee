
FlowRouter.route '/battle',
  name : 'battle'
  subscriptions : (param) ->
    # リアクティブじゃない、サーバーからのみ送られる物はここでサブスクライブする感じ
    return
  action : ->
    BlazeLayout.render 'main',
      content : 'battle'
    return

# リアクティブな物は、Template.instance().autorun でサブスクライブさせる
Template.battle.onCreated ->
  return

Template.battle.onRendered ->
  ins = @
  ins.autorun ->
    ins.subscribe 'Groups.owner',
      onReady : ->
        startBattle
          mapid : 1
          mapx  : 0
          mapy  : 0
          groups : for group in Groups.owner.find().fetch() then group._id
  return

Template.battle.onDestroyed ->
  app?.flare 'destroyed'
  return

Template.battle.helpers

$(document).on 'mouseout', '.battle-canvas', ->
  app?.flare 'canvas.mouseout'
  return
