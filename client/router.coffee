
FlowRouter.route '/',
  name   : 'top'
  action : ->
    BlazeLayout.render 'main',
      content : 'home'
    return

FlowRouter.route '/battle',
  name   : 'battle'
  action : ->
    BlazeLayout.render 'main',
      content : 'battle'
    return
