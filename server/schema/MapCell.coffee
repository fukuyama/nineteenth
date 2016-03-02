MapCell = new Mongo.Collection 'MapCell'

MapCell.schema = new SimpleSchema
  mapid :
    type  : Number
    label : 'Map ID'
  index :
    type  : Number
    label : 'Frame Index'
  mapx :
    type  : Number
    label : 'MapX'
  mapy :
    type  : Number
    label : 'MapY'

Meteor.publish 'MapCell', (map={mapx:0,mapy:0}) ->
  {
    mapx
    mapy
  } = map
  MapCell.find
    mapx :
      $lt : mapx - 10
      $gt : mapx + 10
    mapy :
      $lt : mapy - 10
      $gt : mapy + 10
