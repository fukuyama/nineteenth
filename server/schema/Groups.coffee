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

publish 'Groups.at', (id) ->
  Groups.find _id : id
publish 'Groups.owner', (owner = @userId) ->
  Groups.find owner : owner
