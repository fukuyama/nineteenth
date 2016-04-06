import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const OwnerCharacters = new Mongo.Collection('OwnerCharacters');

const CharacterGroups = new Mongo.Collection('CharacterGroups');

OwnerCharacters.helpers({
  group() {
    return CharacterGroups.findOne({_id : this.groupId});
  }
});

export const Characters = new Mongo.Collection('Characters');

Characters.schema = new SimpleSchema({
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
  typeId : {
    type  : String,
    label : 'TypeID'
  },
  groupId : {
    type  : String,
    label : 'GroupID',
    defaultValue : '',
    optional: true
  }
});

Characters.attachSchema(Characters.schema);
