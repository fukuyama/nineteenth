FlowRouter.route '/groups/:groupId',
  name   : 'group_view'
  action : (param) ->
    BlazeLayout.render 'main',
      content : 'group_view'
      param   : param
    return

# group_view
Template.group_view.onCreated ->
  self = @
  self.autorun ->
    self.subscribe 'Groups.at', self.data.groupId
    self.subscribe 'Characters.group', self.data.groupId
    self.subscribe 'Characters.groupother', self.data.groupId

Template.group_view.helpers
  group : ->
    Groups.at.findOne @groupId

# group
Template.group.helpers
  isOwner : ->
    @owner is Meteor.userId()
  members : ->
    Characters.group.find {
      group : @_id
    }
  characters : ->
    Characters.groupother.find {
      group : {$ne : @_id}
    }

Template.group.events
  'click .delete-group' : (event) ->
    Meteor.call 'deleteGroup', id : @_id
    FlowRouter.go('/groups')

  'click .add-member' : (event) ->
    event.preventDefault()
    data = Template.currentData()
    Meteor.call 'addMemberToGroup',
      characterId : @_id
      groupId     : data._id

  'click .delete-member' : (event) ->
    event.preventDefault()
    data = Template.currentData()
    Meteor.call 'deleteMemberToGroup',
      characterId : @_id
