CharacterTypes = @CharacterTypes = new Mongo.Collection 'CharacterTypes'

CharacterTypes.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  createdAt :
    type  : Date
    label : 'CreatedAt'
  image :
    type  : String
    label : 'Image'
  spriteSheet :
    type  : String
    label : 'Sprite Sheet'

Meteor.publish 'CharacterTypes', ->
  CharacterTypes.find()
