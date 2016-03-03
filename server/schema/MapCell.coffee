MapCell = @MapCell = new Mongo.Collection 'MapCell'

MapCell.attachSchema new SimpleSchema
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
  console.log "#{mapx} #{mapy}"
  MapCell.find
    mapx :
      $lt : mapx + 5
      $gt : mapx - 5
    mapy :
      $lt : mapy + 5
      $gt : mapy - 5
