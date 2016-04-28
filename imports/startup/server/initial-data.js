
import { MapData } from '/imports/api/map-data/map-data.js';
import { MapCells } from '/imports/api/map-cells/map-cells.js';
import { CharacterTypes } from '/imports/api/character-types/character-types.js';

import { addMapData } from '/imports/api/map-data/methods.js';

Meteor.startup( function () {
  const mapname = 'TEST MAP';
  let map = MapData.findOne({name : mapname});
  if (!map) {
    addMapData.call({name : mapname});
    map = MapData.findOne({name : mapname});
    console.log('MapData initialized', map);
  }
  const cell = MapCells.findOne({mapId : map._id});
  if (!cell) {
    for (let mapx = -50; mapx <= 50; mapx++) {
      for (let mapy = -50; mapy <= 50; mapy++) {
        MapCells.insert({
          mapId : map._id,
          index : 0,
          mapx  : mapx,
          mapy  : mapy
        });
      }
    }
    console.log('MapCells initialized');
  }
  if (CharacterTypes.find().count() == 0) {
    const src = Assets.getText('data/character_type_001.json');
    const obj = JSON.parse(src);
    obj.createdAt = new Date();
    CharacterTypes.insert(obj);
    console.log('CharacterTypes initialized');
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


  #if SpriteSheets.find().count() is 0
  #  src = Assets.getText 'data/character_test_ss.coffee'
  #  obj = Npm.require('coffee-script').eval src
  #  SpriteSheets.insert obj
  #  console.log 'SpriteSheets initialized'
  return
*/
