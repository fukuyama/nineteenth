Characters = @Characters = new Mongo.Collection 'Characters'

Characters.attachSchema new SimpleSchema
  name :
    type  : String
    label : 'Name'
  createdAt :
    type  : Date
    label : 'CreatedAt'
  owner :
    type  : String
    label : 'UserID'
  type :
    type  : String
    label : 'Type'
  group :
    type  : String
    label : 'Group'
    defaultValue : ''
    optional: true

Meteor.publish 'Characters.onwer', ->
  Characters.find
    owner : @userId

Meteor.publish 'Characters.group', (group) ->
  Characters.find
    group : group
