Meteor.methods
  addGroup: (param) ->
    userId = Meteor.userId()
    if not userId
      throw new Meteor.Error('not-authorized')
    Groups.insert
      name      : param.name
      createdAt : new Date()
      owner     : userId
