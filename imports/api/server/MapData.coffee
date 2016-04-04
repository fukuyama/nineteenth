MapData = @MapData = new Mongo.Collection 'MapData'

MapData.attachSchema new SimpleSchema
  mapid :
    type  : Number
    label : 'Map ID'
  name :
    type  : String
    label : 'Name'
