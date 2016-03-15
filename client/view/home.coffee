FlowRouter.route '/',
  name   : 'top'
  action : ->
    BlazeLayout.render 'main',
      content : 'home'
    return
