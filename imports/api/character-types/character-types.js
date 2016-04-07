import { Mongo } from 'meteor/mongo';

export const CharacterTypes = new Mongo.Collection('CharacterTypes');

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
