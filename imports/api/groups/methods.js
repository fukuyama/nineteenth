import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Characters } from '/imports/api/characters/characters.js';
import { Groups } from '/imports/api/groups/groups.js';

const authorizedUserId = function () {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error('not-authorized');
  }
  return userId;
};

export const addGroup = new ValidatedMethod({
  name : 'Groups.add',
  validate : new SimpleSchema({
    name : { type : String, label : 'group name', min : 1 }
  }).validator(),
  run({ name }) {
    const userId = authorizedUserId();
    const group = {
      name      : name,
      createdAt : new Date(),
      ownerId   : userId
    };
    Groups.insert(group);
  }
});

export const deleteGroup = new ValidatedMethod({
  name : 'Groups.delete',
  validate : new SimpleSchema({
    id : { type : String, min : 1 }
  }).validator(),
  run({ id }) {
    const userId = authorizedUserId();
    const query = {
      _id     : id,
      ownerId : userId
    };
    const group = Groups.findOne(query);
    if (!group) {
      throw new Meteor.Error('not-found');
    }
    Groups.remove(query);
  }
});

export const addMemberToGroup = new ValidatedMethod({
  name : 'Groups.addMember',
  validate : new SimpleSchema({
    characterId : { type : String, min : 1 },
    groupId     : { type : String, min : 1 }
  }).validator(),
  run({characterId, groupId}) {
    const userId = authorizedUserId()
    Characters.update(characterId,{$set: {groupId : groupId}});
  }
});

export const deleteMemberToGroup = new ValidatedMethod({
  name : 'Groups.deleteMember',
  validate : new SimpleSchema({
    characterId : { type : String, min : 1 }
  }).validator(),
  run({characterId}) {
    const userId = authorizedUserId();
    Characters.update(characterId,{$unset: {groupId : ""}});
  }
});

// Get list of all method names on Lists
const METHODS = _.pluck([
  addGroup,
  deleteGroup,
  addMemberToGroup,
  deleteMemberToGroup
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
