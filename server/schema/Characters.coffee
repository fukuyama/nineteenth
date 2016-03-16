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

publish 'Characters.at', (id) ->
  Characters.find _id : id
publish 'Characters.owner', (owner = @userId) ->
  Characters.find owner : owner
publish 'Characters.group', (group) ->
  Characters.find group : group
publish 'Characters.groupother', (group) ->
  Characters.find
    owner : @userId
    group : {$ne : group}
