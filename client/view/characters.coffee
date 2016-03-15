FlowRouter.route '/characters',
  name   : 'characters'
  action : ->
    BlazeLayout.render 'main',
      content : 'characters'
    return

Template.characters.helpers
  characters : ->
    Characters.find {owner : Meteor.userId()},{sort: {createdAt: 1}}
