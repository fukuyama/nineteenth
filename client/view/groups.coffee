FlowRouter.route '/groups',
  name   : 'groups'
  action : ->
    BlazeLayout.render 'main',
      content : 'groups'
    return

Template.groups.onCreated ->
  self = @
  self.autorun ->
    self.subscribe 'Groups.owner'

Template.groups.helpers
  groups : ->
    Groups.owner.find {owner : Meteor.userId()},{sort: {createdAt: 1}}
