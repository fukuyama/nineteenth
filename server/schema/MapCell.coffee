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
    mapid
    mapx
    mapy
  } = map
  w = 11
  h = 8
  minx = mapx - w
  maxx = mapx + w
  miny = mapy - h
  maxy = mapy + h
  list　= for i in [minx + 1 .. maxx] when i % 2 isnt 0 then i
  MapCell.find
    $or : [{
      mapx :
        $lt : maxx
        $gt : minx
      mapy :
        $lt : maxy
        $gt : miny
    },{
      mapx : {$in : list}
      mapy : miny
    }]

Meteor.publish 'MapCell.map', (param) ->
  {
    mapid
  } = param
  console.log 'MapCell.map',param
  MapCell.find mapid: mapid

Meteor.publish 'MapCell.range', (param) ->
  {
    mapid
    min
    max
  } = param
  console.log 'MapCell.range',param
  MapCell.find
    mapid : mapid
    mapx  :
      $lt : max.x
      $gt : min.x
    mapy  :
      $lt : max.y
      $gt : min.y
