Meteor.methods
  addMemberToGroup: (param) ->
    userId = Meteor.userId()
    if not userId
      throw new Meteor.Error('not-authorized')
    {
      characterId
      groupId
    } = param
    Characters.update characterId,
      $set: {group : groupId}
