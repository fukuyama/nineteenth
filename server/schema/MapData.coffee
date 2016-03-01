@nz = nz = @nz ? {}

nz.MapData = new Mongo.Collection 'MapData'

nz.MapData.schema = new SimpleSchema
  name :
    type  : String
    label : 'Name'
  width :
    type  : Number
    label : 'Width'
  height :
    type  : Number
    label : 'Height'
