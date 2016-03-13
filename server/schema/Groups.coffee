Groups = @Groups = new Mongo.Collection 'Groups'

Groups.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  owner :
    type  : String
    label : 'UserID'

Meteor.publish 'Groups', ->
  Groups.find
    owner : Meteor.userid()
