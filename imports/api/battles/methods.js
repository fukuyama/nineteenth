import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { authorizedUserId } from '../lib/functions.js';

import { Battles } from '/imports/api/battles/battles.js';

export const addBattle = new ValidatedMethod({
  name : 'Battles.add',
  validate : Battles.schema.pick(['name','mapId']).validator(),
  run({ name, mapId }) {
    const userId = authorizedUserId();
    const battle = {
      name        : name,
      createdAt   : new Date(),
      ownerId     : userId,
      status      : 'new',
      joinUsersId : [userId],
      mapId       : mapId
    };
    Battles.insert(battle);
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
      const battle = Battles.findOne({
        _id : id,
        joinUsersId : userId
      });
      if (!battle) {
        throw new Meteor.Error('not-found',id);
      }
      if (!_.contains(battle.groupsId,groupId)) {
        console.log('add',battle.name,groupId);
        Battles.update(
          {_id  : id},
          {$push : {groupsId : groupId}}
        );
      } else {
        console.log('exist',battle.name,groupId);
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
      const battle = Battles.findOne({
        _id : id,
        joinUsersId : userId
      });
      if (!battle) {
        throw new Meteor.Error('not-found',id);
      }
      if (_.contains(battle.groupsId,groupId)) {
        console.log('del',battle.name,groupId);
        Battles.update(
          {_id   : id},
          {$pull : {groupsId : groupId}}
        );
      } else {
        console.log('not found',battle.name,groupId);
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
