Template.battle.onRendered ->
  startBattle()
  return

$(document).on 'mouseout', '.battle-canvas', ->
  app?.flare 'canvas.mouseout'
  return
