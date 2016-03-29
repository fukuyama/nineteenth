MapCells = @MapCells = new Mongo.Collection 'MapCells'

MapCells.attachSchema new SimpleSchema
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

publish 'MapCells.At', (param) ->
  {
    mapid
    mapx
    mapy
  } = param
  MapCells.find
    mapid : mapid
    mapx  : mapx
    mapy  : mapy

publish 'MapCells.Range', (param) ->
  {
    mapid
    min
    max
  } = param
  MapCells.find
    mapid : mapid
    mapx  :
      $lt : max.x
      $gt : min.x
    mapy  :
      $lt : max.y
      $gt : min.y
