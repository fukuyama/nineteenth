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
  w = 11
  h = 8
  list　= for i in [mapx - w + 1 .. mapx + w] when i % 2 isnt 0 then i
  MapCell.find
    $or : [{
      mapx :
        $lt : mapx + w
        $gt : mapx - w
      mapy :
        $lt : mapy + h
        $gt : mapy - h
    },{
      mapx : {$in : list}
      mapy : mapy - h
    }]
