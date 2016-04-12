
import { MapData } from '/imports/api/map-data/map-data.js';
import { addMapData } from '/imports/api/map-data/methods.js';

Meteor.startup( function () {
  const mapname = 'TEST MAP';
  const map = MapData.findOne({name : mapname});
  if (!map) {
    addMapData.call({name : mapname});
    data = MapData.findOne({name : mapname});
    console.log('MapData initialized', data);
  }
});

/*
  mapid = 1

  map = MapData.findOne mapid:mapid
  unless map?
    data =
      mapid : mapid
      name  : 'MAP001'
    MapData.insert data
    console.log 'MapData initialized',data

  cell = MapCells.findOne mapid:mapid
  unless cell?
    for mapx in [-50 .. 50]
      for mapy in [-50 .. 50]
        MapCells.insert
          mapid : mapid
          index : 0
          mapx  : mapx
          mapy  : mapy
    console.log 'MapCell initialized'

  if CharacterTypes.find().count() is 0
    src = Assets.getText 'data/character_type_001.coffee'
    obj = Npm.require('coffee-script').eval src
    obj.createdAt = new Date()
    CharacterTypes.insert obj
    console.log 'CharacterTypes initialized'

  #if SpriteSheets.find().count() is 0
  #  src = Assets.getText 'data/character_test_ss.coffee'
  #  obj = Npm.require('coffee-script').eval src
  #  SpriteSheets.insert obj
  #  console.log 'SpriteSheets initialized'
  return
*/
