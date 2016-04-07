import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MapCells = new Mongo.Collection('MapCells');

MapCells.schema = new SimpleSchema({
  mapId : {
    type  : Number,
    label : 'MapID'
  },
  index : {
    type  : Number,
    label : 'FrameIndex'
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
