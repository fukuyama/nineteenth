import { Meteor } from 'meteor/meteor';

import { Groups } from '/imports/api/groups/groups.js';

Meteor.publishComposite('GroupsAt', {
  collectionName : 'GroupsAt',
  find(id) {
    return Groups.find({_id : id});
  }
});

Meteor.publishComposite('OwnerGroups', function({ownerId}) {
  return {
    collectionName : 'OwnerGroups',
    find() {
      return Groups.find({ownerId : ownerId});
    }
  };
});
