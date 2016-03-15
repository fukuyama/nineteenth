Groups = @Groups = new Mongo.Collection 'Groups'

Groups.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  createdAt :
    type  : Date
    label : 'CreatedAt'
  owner :
    type  : String
    label : 'UserID'

Meteor.publish 'Group', (id) ->
  Groups.find id

Meteor.publish 'Groups.all', ->
  Groups.find {}

Meteor.publish 'Groups.owner', ->
  Groups.find
    owner : @userId
