FlowRouter.route '/add_group',
  name   : 'add group'
  action : ->
    BlazeLayout.render 'main',
      content : 'add_group'
    return

Template.add_group.events
  'submit .add_group': (event) ->
    event.preventDefault()
    Meteor.call 'addGroup',
      name : event.target.name.value
    FlowRouter.go('/groups')
