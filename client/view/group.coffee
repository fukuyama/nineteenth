FlowRouter.route '/groups/:groupId',
  name   : 'group_view'
  action : (param) ->
    BlazeLayout.render 'main',
      content : 'group_view'
      param   : param
    return

# group_view
#Template.group_view.onCreated ->
#  self = @
#  self.autorun ->
#    self.subscribe 'Group', self.data.groupId
#    self.subscribe 'Characters.owner'
#    self.subscribe 'Characters.group', self.data.groupId

Template.group_view.helpers
  group : ->
    Groups.findOne @groupId
  members : ->
    Characters.find {
      group : @groupId
    }
  characters : ->
    Characters.find {
      owner : Meteor.userId()
      group : {$ne : @groupId}
    }

Template.group_view.events
  'click .add' : (event) ->
    event.preventDefault()
    data = Template.currentData()
    Meteor.call 'addMemberToGroup',
      characterId  : @_id
      groupId      : data.groupId

  'click .del' : (event) ->
    event.preventDefault()
    data = Template.currentData()
    Meteor.call 'deleteMemberToGroup',
      characterId  : @_id

# group
Template.group.helpers
  isOwner : -> @owner is Meteor.userId()

Template.group.events
  'click .delete' : (event) ->
    Meteor.call 'deleteGroup', id : @_id
    FlowRouter.go('/groups')
  'click .add-member' : (event) ->
    return
