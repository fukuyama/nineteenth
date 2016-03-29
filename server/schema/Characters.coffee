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

publish 'Characters.At', (id) ->
  Characters.find _id : id
publish 'Characters.Owner', (owner = @userId) ->
  Characters.find owner : owner
publish 'Characters.Group', (group) ->
  unless Array.isArray group
    group = [group]
  Characters.find group : {$in : group}
publish 'Characters.GroupOther', (group) ->
  Characters.find
    owner : @userId
    group : {$ne : group}
