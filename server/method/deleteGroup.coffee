Meteor.methods
  deleteGroup: (param) ->
    {
      id
    } = param
    group = Groups.findOne id
    if group.owner isnt Meteor.userId()
      throw new Meteor.Error 'not-authorized'
    Groups.remove id
