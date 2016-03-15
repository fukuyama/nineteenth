FlowRouter.route '/groups',
  name   : 'groups'
  action : ->
    BlazeLayout.render 'main',
      content : 'groups'
    return

Template.groups.helpers
  groups : ->
    Groups.find {owner : Meteor.userId()},{sort: {createdAt: -1}}
