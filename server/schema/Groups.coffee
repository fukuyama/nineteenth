Groups = @Groups = new Mongo.Collection 'Groups'

Groups.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  userid :
    type  : String
    label : 'UserID'

Meteor.publish 'Groups', ->
  Groups.find
    userid : Meteor.userid()
