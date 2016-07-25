import { Mongo } from 'meteor/mongo';

export const BattleLogs = new Mongo.Collection('BattleLogs');

BattleLogs.schema = new SimpleSchema({
  createdAt : {
    type  : Date,
    label : 'CreatedAt'
  },
  battleId : {
    type  : String,
    label : 'battle id',
    min   : 1
  },
  characterId : {
    type  : String,
    label : 'character id',
    min   : 1
  },
  turn : {
    type  : Number,
    label : 'Turn'
  },
  actions : {
    type  : [Object],
    label : 'actions',
    min   : 1
  },
  "actions.$.action" : {
    type  : String
    label : 'action'
  },
  "actions.$.params" : {
    type  : [Object]
    label : 'action parameters'
  }
});

BattleLogs.attachSchema(BattleLogs.schema);
