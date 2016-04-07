import { Meteor } from 'meteor/meteor';

import { Groups } from '/imports/api/groups/groups.js';
import { Characters } from '/imports/api/characters/characters.js';
import { CharacterTypes } from '/imports/api/character-types/character-types.js';

const relartedChildren = [{
    collectionName : 'RelartedCharacterGroups',
    find(character) {
      return Groups.find({_id : character.groupId});
    }
  },{
    collectionName : 'RelartedCharacterTypes',
    find(character) {
      return CharacterTypes.find({_id : character.typeId});
    }
  }
];

Meteor.publishComposite('Characters', function (id) {
  return {
    collectionName : 'Characters',
    find() {
      return Characters.find({_id : id});
    },
    children : relartedChildren
  };
});

Meteor.publishComposite('OwnerCharacters', function (ownerId = this.userId) {
  return {
    collectionName : 'OwnerCharacters',
    find() {
      return Characters.find({ownerId : ownerId});
    },
    children : relartedChildren
  };
});

Meteor.publishComposite('GroupCharacters', function (groupId) {
  return {
    collectionName : 'GroupCharacters',
    find() {
      return Characters.find({groupId : groupId});
    },
    children : relartedChildren
  };
});
