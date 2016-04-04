@MapCells =
  At    : new Mongo.Collection 'MapCells.At'
  Range : new Mongo.Collection 'MapCells.Range'

@CharacterTypes = new Mongo.Collection 'CharacterTypes'

@Characters =
  At         : new Mongo.Collection 'Characters.At'
  Owner      : new Mongo.Collection 'Characters.Owner'
  Group      : new Mongo.Collection 'Characters.Group'
  GroupOther : new Mongo.Collection 'Characters.GroupOther'

@Groups =
  At    : new Mongo.Collection 'Groups.At'
  Owner : new Mongo.Collection 'Groups.Owner'

Tracker.autorun ->
  Meteor.subscribe 'CharacterTypes'
