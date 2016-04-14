import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { authorizedUserId } from '../lib/functions.js';

import { Battles,JoinBattles } from '/imports/api/battles/battles.js';
import { BattleJoinUsers } from '/imports/api/battles/battle-join-users.js';
import { BattleJoinGroups } from '/imports/api/battles/battle-join-groups.js';

export const addBattle = new ValidatedMethod({
  name : 'Battles.add',
  validate : Battles.schema.pick(['name','mapId']).validator(),
  run({ name, mapId }) {
    const userId = authorizedUserId();
    if (!this.isSimulation) {
      const battle = {
        name        : name,
        createdAt   : new Date(),
        ownerId     : userId,
        status      : 'new',
        mapId       : mapId
      };
      const battleId = Battles.insert(battle);
      BattleJoinUsers.insert({
        battleId : battleId,
        userId   : userId
      });
    }
  }
});

export const deleteBattle = new ValidatedMethod({
  name : 'Battles.delete',
  validate : new SimpleSchema({id : {type : String, min : 1}}).validator(),
  run({ id }) {
    const userId = authorizedUserId();
    const query = {
      _id     : id,
      ownerId : userId
    };
    if (!this.isSimulation) {
      const battle = Battles.findOne(query);
      if (!battle) {
        throw new Meteor.Error('not-found');
      }
      Battles.remove(query);
      BattleJoinUsers.remove({
        battleId : id
      });
    }
  }
});

export const addGroupToBattle = new ValidatedMethod({
  name : 'Battles.addGroup',
  validate : new SimpleSchema({
    id      : {type : String, min : 1},
    groupId : {type : String, min : 1}
  }).validator(),
  run({ id, groupId }) {
    const userId = authorizedUserId();
    if (!this.isSimulation) {
      console.log({
        battleId : id,
        usersId  : userId
      });
      const battle = BattleJoinUsers.findOne({
        battleId : id,
        userId   : userId
      });
      if (!battle) {
        throw new Meteor.Error('not-found',id);
      }
      const query = {
        battleId : id,
        groupId  : groupId
      };
      if (!BattleJoinGroups.findOne(query)) {
        console.log('add',id,groupId);
        BattleJoinGroups.insert({
          battleId : id,
          groupId  : groupId
        });
      } else {
        console.log('exist',id,groupId);
      }
    }
  }
});

export const deleteGroupToBattle = new ValidatedMethod({
  name : 'Battles.deleteGroup',
  validate : new SimpleSchema({
    id      : {type : String, min : 1},
    groupId : {type : String, min : 1}
  }).validator(),
  run({ id, groupId }) {
    const userId = authorizedUserId();
    if (!this.isSimulation) {
      console.log({
        battleId : id,
        usersId  : userId
      });
      const battle = BattleJoinUsers.findOne({
        battleId : id,
        userId   : userId
      });
      if (!battle) {
        throw new Meteor.Error('not-found',id);
      }
      const query = {
        battleId : id,
        groupId  : groupId
      };
      if (BattleJoinGroups.findOne(query)) {
        console.log('del',id,groupId);
        BattleJoinGroups.remove({
          battleId : id,
          groupId  : groupId
        });
      } else {
        console.log('not found',id,groupId);
      }
    }
  }
});

// Get list of all method names on Lists
const METHODS = _.pluck([
  addBattle,
  addGroupToBattle
], 'name');

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
