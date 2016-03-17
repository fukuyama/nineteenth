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

publish 'MapCell.at', (param) ->
  console.log 'publish MapCell.at', param
  {
    mapid
    mapx
    mapy
  } = param
  MapCell.find
    mapid : mapid
    mapx  : mapx
    mapy  : mapy

publish 'MapCell.range', (param) ->
  {
    mapid
    min
    max
  } = param
  MapCell.find
    mapid : mapid
    mapx  :
      $lt : max.x
      $gt : min.x
    mapy  :
      $lt : max.y
      $gt : min.y
