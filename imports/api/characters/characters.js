import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Characters = new Mongo.Collection('Characters');
export const OwnerCharacters = new Mongo.Collection('OwnerCharacters');
export const GroupCharacters = new Mongo.Collection('GroupCharacters');

const RelartedCharacterGroups = new Mongo.Collection('RelartedCharacterGroups');
const RelartedCharacterTypes = new Mongo.Collection('RelartedCharacterTypes');

const characterHelpers = {
  group() {
    return RelartedCharacterGroups.findOne({_id : this.groupId});
  },
  type() {
    return RelartedCharacterTypes.findOne({_id : this.typeId});
  }
};

Characters.helpers(characterHelpers);
OwnerCharacters.helpers(characterHelpers);
GroupCharacters.helpers(characterHelpers);

Characters.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

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
