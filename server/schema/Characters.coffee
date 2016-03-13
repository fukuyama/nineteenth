Characters = @Characters = new Mongo.Collection 'Characters'

Characters.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  owner :
    type  : String
    label : 'UserID'

Meteor.publish 'Characters', ->
  Characters.find
    owner : Meteor.userid()
