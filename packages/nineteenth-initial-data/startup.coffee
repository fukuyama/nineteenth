
Meteor.startup ->
  mapid = 1

  map = MapData.findOne mapid:mapid
  unless map?
    data =
      mapid : mapid
      name  : 'MAP001'
    MapData.insert data
    console.log 'MapData initialized',data

  cell = MapCell.findOne mapid:mapid
  unless cell?
    for mapx in [-50 .. 50]
      for mapy in [-50 .. 50]
        MapCell.insert
          mapid : mapid
          index : 0
          mapx  : mapx
          mapy  : mapy
    console.log 'MapCell initialized'

  if SpriteSheets.find().count() is 0
    src = Assets.getText 'data/character_test_ss.coffee'
    obj = Npm.require('coffee-script').eval src
    SpriteSheets.insert obj
    console.log 'SpriteSheets initialized'
  return
