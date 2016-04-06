import { Meteor } from 'meteor/meteor';

import { Groups } from '/imports/api/groups/groups.js';
import { Characters } from '/imports/api/characters/characters.js';

const CharacterGroups = {
  collectionName : 'CharacterGroups',
  find(character) {
    return Groups.find({_id : character.groupId});
  }
};

Meteor.publishComposite('OwnerCharacters', function (ownerId=this.userId) {
  return {
    collectionName : 'OwnerCharacters',
    find() {
      return Characters.find({ownerId : ownerId});
    },
    children : [
      CharacterGroups
    ]
  };
});

Meteor.publishComposite('Characters', function (id) {
  return {
    collectionName : 'Characters',
    find() {
      return Characters.find({_id : id});
    },
    children : [
      CharacterGroups
    ]
  };
});
