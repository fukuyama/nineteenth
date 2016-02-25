
$(document).on 'shown.bs.collapse', '.navbar-collapse', ->
  app?.fitScreen()
  return

$(document).on 'hidden.bs.collapse', '.navbar-collapse', ->
  app?.fitScreen()
  return
