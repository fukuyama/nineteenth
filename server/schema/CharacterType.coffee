CharacterType = @CharacterType = new Mongo.Collection 'CharacterType'

CharacterType.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  image :
    type  : String
    label : 'Image'
  spritesheet :
    type  : String
    label : 'Sprite Sheet'

Meteor.publish 'CharacterType', ->
  CharacterType.find()
