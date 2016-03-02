MapData = new Mongo.Collection 'MapData'

MapData.schema = new SimpleSchema
  name :
    type  : String
    label : 'Name'
