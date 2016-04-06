import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { publish } from '/imports/api/functions.js';

import { MapData } from '../mapData.js';

MapData.schema = new SimpleSchema({
  mapid : {
    type  : Number,
    label : 'Map ID'
  },
  name : {
    type  : String,
    label : 'Name'
  }
});

MapData.attachSchema(MapData.schema);
