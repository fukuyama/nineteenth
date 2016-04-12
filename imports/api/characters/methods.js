import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { authorizedUserId } from '../lib/functions.js';

import { Characters } from '/imports/api/characters/characters.js';

export const addCharacter = new ValidatedMethod({
  name : 'Characters.add',
  validate : Characters.schema.pick(['name','typeId']).validator(),
  run({ name, typeId }) {
    const userId = authorizedUserId();
    const character = {
      name      : name,
      createdAt : new Date(),
      ownerId   : userId,
      typeId    : typeId
    };
    Characters.insert(character);
  }
});

export const deleteCharacter = new ValidatedMethod({
  name : 'Characters.delete',
  validate : new SimpleSchema({id : { type : String, min : 1 }}).validator(),
  run({ id }) {
    const userId = authorizedUserId();
    const query = {
      _id     : id,
      ownerId : userId
    };
    const character = Characters.findOne(query);
    if (!character) {
      throw new Meteor.Error('not-found');
    }
    Characters.remove(query);
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
  addCharacter,
  deleteCharacter,
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
