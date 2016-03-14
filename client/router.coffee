
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

FlowRouter.route '/characters',
  name   : 'characters'
  action : ->
    BlazeLayout.render 'main',
      content : 'characters'
    return

FlowRouter.route '/characters/:characterId',
  name   : 'character view'
  action : (param) ->
    BlazeLayout.render 'main',
      content : 'character_detail'
      param   :
        character : Characters.findOne {_id:param.characterId}
    return

FlowRouter.route '/add_character',
  name   : 'add character'
  action : ->
    BlazeLayout.render 'main',
      content : 'add_character'
    return

FlowRouter.route '/groups',
  name   : 'groups'
  action : ->
    BlazeLayout.render 'main',
      content : 'groups'
    return
