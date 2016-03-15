Meteor.methods
  deleteMemberToGroup: (param) ->
    userId = Meteor.userId()
    if not userId
      throw new Meteor.Error('not-authorized')
    {
      characterId
    } = param
    Characters.update characterId,
      $unset: {group : ""}
