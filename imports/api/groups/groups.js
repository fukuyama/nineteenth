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
    label : 'Name'
  },
  createdAt : {
    type  : Date,
    label : 'CreatedAt'
  },
  ownerId : {
    type  : String,
    label : 'OwnerId'
  }
});

Groups.attachSchema(Groups.schema);
