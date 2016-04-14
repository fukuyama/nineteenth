import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BattleJoinUsers = new Mongo.Collection('BattleJoinUsers');

BattleJoinUsers.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

BattleJoinUsers.schema = new SimpleSchema({
  battleId : {
    type  : String,
    label : 'battle id',
    min   : 1
  },
  userId : {
    type  : String,
    label : 'battle join user id',
    min   : 1
  }
});

BattleJoinUsers.attachSchema(BattleJoinUsers.schema);
