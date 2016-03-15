FlowRouter.route '/characters/:characterId',
  name   : 'character'
  action : (param) ->
    {
      characterId
    } = param
    Meteor.subscribe 'Character', characterId, ->
      BlazeLayout.render 'main',
        content : 'character'
        param   : Characters.findOne characterId
    return

Template.character.helpers
  isOwner : -> @owner is Meteor.userId()

Template.character.events
  'click .delete' : (event) ->
    Meteor.call 'deleteCharacter', id : @_id
    FlowRouter.go('/characters')
