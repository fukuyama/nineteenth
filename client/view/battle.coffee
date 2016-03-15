FlowRouter.route '/battle',
  name   : 'battle'
  action : ->
    BlazeLayout.render 'main',
      content : 'battle'
    return

Template.battle.onRendered ->
  startBattle()
  return

$(document).on 'mouseout', '.battle-canvas', ->
  app?.flare 'canvas.mouseout'
  return
