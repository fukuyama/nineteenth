Template.battle.onRendered ->
  startBattle()
  return

$(document).on 'mouseout', '.battle-canvas', ->
  #$('.battle-canvas').mouseout ->
  console.log 'mouseout'
  return
