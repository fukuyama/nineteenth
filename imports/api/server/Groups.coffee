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

publish 'Groups.At', (id) ->
  Groups.find _id : id
publish 'Groups.Owner', (owner = @userId) ->
  Groups.find owner : owner
