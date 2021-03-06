import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Battles = new Mongo.Collection('Battles');
export const JoinBattles = new Mongo.Collection('JoinBattles');

const RelartedMapData = new Mongo.Collection('RelartedMapData');
const RelartedJoinUsers = new Mongo.Collection('RelartedJoinUsers');
const RelartedJoinGroups = new Mongo.Collection('RelartedJoinGroups');
const RelartedUsers = new Mongo.Collection('RelartedUsers');
const RelartedGroups = new Mongo.Collection('RelartedGroups');
const RelartedGroupCharacters = new Mongo.Collection('RelartedGroupCharacters');

RelartedGroups.helpers({
  characters() {
    return RelartedGroupCharacters.find({groupId : this._id});
  }
});

const battleHelpers = {
  mapdata() {
    return RelartedMapData.findOne({_id : this.mapId});
  },
  users() {
    const ids = RelartedJoinUsers.find({battleId : this._id}).map((join) => {return join.userId});
    return RelartedUsers.find({_id : {$in : ids}});
  },
  groups() {
    const ids = RelartedJoinGroups.find({battleId : this._id}).map((join) => {return join.groupId});
    return RelartedGroups.find({_id : {$in : ids}});
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
  mapId : {
    type  : String,
    label : 'battle map id',
    min   : 1
  }
});

Battles.attachSchema(Battles.schema);
