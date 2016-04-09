import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Battles = new Mongo.Collection('Battles');

Battles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Battles.schema = new SimpleSchema({
  name : {
    type  : String,
    label : 'Name'
  },
  createdAt : {
    type  : Date,
    label : 'CreatedAt'
  },
  ownerId : {
    type  : String,
    label : 'OwnerId'
  },
  groupIdList : {
    type  : [String],
    label : 'Group ID List',
    defaultValue : '',
    optional: true
  }
});

Battles.attachSchema(Battles.schema);
