import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Battles = new Mongo.Collection('Battles');
export const JoinBattles = new Mongo.Collection('JoinBattles');

const RelartedMapData = new Mongo.Collection('RelartedMapData');
const RelartedGroups = new Mongo.Collection('RelartedGroups');
const RelartedGroupCharacters = new Mongo.Collection('RelartedGroupCharacters');

RelartedGroups.helpers({
  characters() {
    return RelartedGroupCharacters.find({groupsId : this._id});
  }
});

const battleHelpers = {
  mapdata() {
    return RelartedMapData.findOne({_id : this.mapId});
  },
  groups() {
    return RelartedGroups.find({_id : {$in : this.groupsId}});
  }
};

Battles.helpers(battleHelpers);
JoinBattles.helpers(battleHelpers);

Battles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

Battles.schema = new SimpleSchema({
  name : {
    type  : String,
    label : 'battle name',
    min   : 1
  },
  createdAt : {
    type  : Date,
    label : 'battle create time'
  },
  ownerId : {
    type  : String,
    label : 'character owner id',
    min   : 1
  },
  status : {
    type  : String,
    label : 'battle status'
  },
  joinUsersId : {
    type  : [String],
    label : 'join user id list'
  },
  groupsId : {
    type  : [String],
    label : 'group id list',
    defaultValue : [],
    optional: true
  },
  mapId : {
    type  : String,
    label : 'battle map id',
    min   : 1
  }
});

Battles.attachSchema(Battles.schema);
