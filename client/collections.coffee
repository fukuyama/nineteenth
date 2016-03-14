@MapCell = new Mongo.Collection 'MapCell'
@CharacterTypes = new Mongo.Collection 'CharacterTypes'
@Characters = new Mongo.Collection 'Characters'

Meteor.subscribe 'CharacterTypes'
Meteor.subscribe 'Characters.onwer'
