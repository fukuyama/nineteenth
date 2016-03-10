Characters = @Characters = new Mongo.Collection 'Characters'

Characters.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  userid :
    type  : String
    label : 'UserID'

Meteor.publish 'Characters', ->
  Characters.find
    userid : Meteor.userid()
