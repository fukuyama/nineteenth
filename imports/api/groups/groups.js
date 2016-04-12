import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Groups = new Mongo.Collection('Groups');
export const OwnerGroups = new Mongo.Collection('OwnerGroups');

Groups.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Groups.schema = new SimpleSchema({
  name : {
    type  : String,
    label : 'group name',
    min   : 1
  },
  createdAt : {
    type  : Date,
    label : 'group create time'
  },
  ownerId : {
    type  : String,
    label : 'group owner id',
    min   : 1
  }
});

Groups.attachSchema(Groups.schema);
