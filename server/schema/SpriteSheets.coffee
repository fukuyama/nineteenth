SpriteSheets = @SpriteSheets = new Mongo.Collection 'SpriteSheets'

Meteor.publish 'SpriteSheets', ->
  SpriteSheets.find {}
