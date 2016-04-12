import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MapData = new Mongo.Collection('MapData');
export const AllMapData = new Mongo.Collection('AllMapData');

MapData.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

MapData.schema = new SimpleSchema({
  name : {
    type  : String,
    label : 'map name',
    min   : 1
  },
  createdAt : {
    type  : Date,
    label : 'map create time'
  }
});

MapData.attachSchema(MapData.schema);
