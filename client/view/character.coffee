FlowRouter.route '/characters/:characterId',
  name   : 'character'
  action : (param) ->
    BlazeLayout.render 'main',
      content : 'character_view'
      param   : param

Template.character_view.onCreated ->
  self = @
  self.autorun ->
    self.subscribe 'Characters.At', self.data.characterId

Template.character_view.helpers
  character : -> Characters.At.findOne @characterId

Template.character.helpers
  isOwner : -> @owner is Meteor.userId()

Template.character.events
  'click .delete' : (event) ->
    Meteor.call 'deleteCharacter', id : @_id
    FlowRouter.go('/characters')
