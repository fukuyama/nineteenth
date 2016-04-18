import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class MapDataCollection extends Mongo.Collection {
  insert(name,callback) {
    const param = {
      name      : name,
      createdAt : new Date()
    };
    return super.insert(param,callback);
  }
}

export const MapData = new MapDataCollection('MapData');
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

MapData.publicFields = {
  name      : 1,
  createdAt : 1
};

Factory.define('map-data', MapData, {});
