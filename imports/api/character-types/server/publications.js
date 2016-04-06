import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { CharacterTypes } from '../character-types.js';

CharacterTypes.schema = new SimpleSchema({
  name : {
    type  : String,
    label : 'Name'
  },
  createdAt : {
    type  : Date,
    label : 'CreatedAt'
  },
  image : {
    type  : String,
    label : 'Image'
  },
  spriteSheet : {
    type  : String,
    label : 'Sprite Sheet'
  }
});

CharacterTypes.attachSchema(CharacterTypes.schema);

Meteor.publish('CharacterTypes', function () {
  return CharacterTypes.find();
});
