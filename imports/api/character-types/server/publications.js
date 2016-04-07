import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { CharacterTypes } from '../character-types.js';

Meteor.publish('CharacterTypes', function () {
  return CharacterTypes.find({});
});
