import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Characters = {
  At         : new Mongo.Collection('Characters.At'),
  Owner      : new Mongo.Collection('Characters.Owner'),
  Group      : new Mongo.Collection('Characters.Group'),
  GroupOther : new Mongo.Collection('Characters.GroupOther')
};
