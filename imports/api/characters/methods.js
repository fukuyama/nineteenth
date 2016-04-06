import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import { Characters } from '/imports/api/characters/characters.js';

export const addCharacter = new ValidatedMethod({
  name : 'Characters.add',
  validate : new SimpleSchema({
    name   : { type: String },
    typeId : { type: String }
  }).validator(),
  run({ name, typeId }) {
    userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }
    const character = {
      name      : name,
      createdAt : new Date(),
      ownerId   : userId,
      typeId    : typeId
    };
    Characters.insert(character);
  }
});

// Get list of all method names on Lists
const METHODS = _.pluck([
  addCharacter,
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
