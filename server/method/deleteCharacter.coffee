Meteor.methods
  deleteCharacter: (param) ->
    {
      id
    } = param
    character = Characters.findOne id
    if character.owner isnt Meteor.userId()
      throw new Meteor.Error 'not-authorized'
    Characters.remove id
