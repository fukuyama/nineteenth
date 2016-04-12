import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { authorizedUserId } from '../lib/functions.js';

import { Characters } from '/imports/api/characters/characters.js';
import { Groups } from '/imports/api/groups/groups.js';

export const addGroup = new ValidatedMethod({
  name : 'Groups.add',
  validate : Groups.schema.pick(['name']).validator(),
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
  validate : new SimpleSchema({id : { type : String, min : 1 }}).validator(),
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

// Get list of all method names on Lists
const METHODS = _.pluck([
  addGroup,
  deleteGroup
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
