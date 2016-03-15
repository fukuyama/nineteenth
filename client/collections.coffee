@MapCell        = new Mongo.Collection 'MapCell'
@CharacterTypes = new Mongo.Collection 'CharacterTypes'
@Characters     = new Mongo.Collection 'Characters'
@Groups         = new Mongo.Collection 'Groups'

Tracker.autorun ->
  Meteor.subscribe 'CharacterTypes'
  Meteor.subscribe 'Groups.all'
  Meteor.subscribe 'Characters.all'
  #Meteor.subscribe 'Groups.owner'
  #Meteor.subscribe 'Characters.owner'
