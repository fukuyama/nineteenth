import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const BattleJoinGroups = new Mongo.Collection('BattleJoinGroups');

BattleJoinGroups.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

BattleJoinGroups.schema = new SimpleSchema({
  battleId : {
    type  : String,
    label : 'battle id',
    min   : 1
  },
  groupId : {
    type  : String,
    label : 'battle join group id',
    min   : 1
  }
});

BattleJoinGroups.attachSchema(BattleJoinGroups.schema);
