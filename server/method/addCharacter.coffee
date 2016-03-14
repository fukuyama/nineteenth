Meteor.methods
  addCharacter: (param) ->
    userId = Meteor.userId()
    if not userId
      throw new Meteor.Error('not-authorized')
    Characters.insert
      name      : param.name
      createdAt : new Date()
      owner     : userId
      type      : param.type
