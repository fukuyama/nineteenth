@MapCell =
  at    : new Mongo.Collection 'MapCell.at'
  range : new Mongo.Collection 'MapCell.range'

@CharacterTypes = new Mongo.Collection 'CharacterTypes'

@Characters =
  at         : new Mongo.Collection 'Characters.at'
  owner      : new Mongo.Collection 'Characters.owner'
  group      : new Mongo.Collection 'Characters.group'
  groupother : new Mongo.Collection 'Characters.groupother'

@Groups =
  at    : new Mongo.Collection 'Groups.at'
  owner : new Mongo.Collection 'Groups.owner'

Tracker.autorun ->
  Meteor.subscribe 'CharacterTypes'
