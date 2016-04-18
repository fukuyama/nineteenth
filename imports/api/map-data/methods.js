import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { MapData } from '/imports/api/map-data/map-data.js';

export const addMapData = new ValidatedMethod({
  name : 'MapData.add',
  validate : MapData.schema.pick(['name']).validator(),
  run({ name }) {
    return MapData.insert(name);
  }
});

export const deleteMapData = new ValidatedMethod({
  name : 'MapData.delete',
  validate : new SimpleSchema({id : {type : String, min : 1}}).validator(),
  run({ id }) {
    return MapData.remove(id);
  }
});
