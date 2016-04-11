import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Characters = new Mongo.Collection('Characters');
export const OwnerCharacters = new Mongo.Collection('OwnerCharacters');
export const GroupCharacters = new Mongo.Collection('GroupCharacters');
export const OtherGroupCharacters = new Mongo.Collection('OtherGroupCharacters');

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
OtherGroupCharacters.helpers(characterHelpers);

Characters.deny({
  insert() {
    console.log('Characters.deny');
    return true;
  },
  update() { return true; },
  remove() { return true; }
});

Characters.schema = new SimpleSchema({
  name : {
    type  : String,
    label : 'character name',
    min   : 1
  },
  createdAt : {
    type  : Date,
    label : 'character create time'
  },
  ownerId : {
    type  : String,
    label : 'character owner id',
    min   : 1
  },
  typeId : {
    type  : String,
    label : 'character type id'
  },
  groupId : {
    type  : String,
    label : 'character group id',
    defaultValue : '',
    optional: true
  }
});

Characters.attachSchema(Characters.schema);
