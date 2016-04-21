import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MapCells = new Mongo.Collection('MapCells');
export const RangeMapCells = new Mongo.Collection('RangeMapCells');

MapCells.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

MapCells.schema = new SimpleSchema({
  mapId : {
    type  : String,
    label : 'map id',
    min   : 1
  },
  index : {
    type  : Number,
    label : 'frame index'
  },
  mapx : {
    type  : Number,
    label : 'map x'
  },
  mapy : {
    type  : Number,
    label : 'map y'
  }
});

MapCells.attachSchema(MapCells.schema);
