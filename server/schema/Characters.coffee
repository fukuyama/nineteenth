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

Meteor.publish 'Character', (id) ->
  Characters.find id

Meteor.publish 'Characters.all', ->
  Characters.find {}

Meteor.publish 'Characters.owner', ->
  query = Characters.find
    owner : @userId
  query.observeChanges
    changed: (id, fields) ->
      console.log 'Characters.owner changed',id
  query

Meteor.publish 'Characters.group', (group) ->
  console.log 'Characters.group',group
  query = Characters.find
    group : group
  query.observeChanges
    changed: (id, fields) ->
      console.log 'Characters.group changed',id
  query
