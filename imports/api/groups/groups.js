import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const GroupsAt = new Mongo.Collection('GroupsAt');
export const OwnerGroups = new Mongo.Collection('OwnerGroups');

export const Groups = new Mongo.Collection('Groups');

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
