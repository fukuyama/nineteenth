Meteor.startup ->
  # code to run on server at startup
  mapid = 1
  map = MapData.findOne mapid:mapid
  unless map?
    MapData.insert
      mapid : mapid
      name  : 'MAP001'
  cell = MapCell.findOne mapid:mapid
  unless cell?
    for mapx in [-10 .. 10]
      for mapy in [-10 .. 10]
        MapCell.insert
          mapid : mapid
          index : 0
          mapx  : mapx
          mapy  : mapy
  return
