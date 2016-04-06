import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { publish } from '/imports/api/functions.js';

export const MapCells = new Mongo.Collection('MapCells');

MapCells.schema = new SimpleSchema({
  mapid : {
    type  : Number,
    label : 'Map ID'
  },
  index : {
    type  : Number,
    label : 'Frame Index'
  },
  mapx : {
    type  : Number,
    label : 'MapX'
  },
  mapy : {
    type  : Number,
    label : 'MapY'
  }
});

MapCells.attachSchema(MapCells.schema);

publish('MapCells.At', function (param) {
  return MapCells.find({
    mapid : param.mapid,
    mapx  : param.mapx,
    mapy  : param.mapy
  });
});

publish('MapCells.Range', function (param) {
  return MapCells.find({
    mapid : param.mapid,
    mapx  : {
      $lt : param.max.x,
      $gt : param.min.x
    },
    mapy  : {
      $lt : param.max.y,
      $gt : param.min.y
    }
  });
});
