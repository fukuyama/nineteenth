MapData = new Mongo.Collection 'MapData'

MapData.schema = new SimpleSchema
  name :
    type  : String
    label : 'Name'


MapCell = new Mongo.Collection 'MapCell'

MapCell.schema = new SimpleSchema
  index :
    type  : Number
    label : 'Frame Index'
  mapx :
    type : Number
    label : 'mapx'
  mapy :
    type : Number
    label : 'mapy'

Meteor.publish "map-cell", (mapx,mapy) ->
  return MapCell.find
    mapx :
      $lt : mapx - 10
      $gt : mapx + 10
    mapy :
      $lt : mapy - 10
      $gt : mapy + 10
