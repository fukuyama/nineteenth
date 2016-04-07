import { Meteor } from 'meteor/meteor';

import { Groups } from '/imports/api/groups/groups.js';

Meteor.publishComposite('Groups', function (id) {
  return {
    collectionName : 'Groups',
    find() {
      return Groups.find({_id : id});
    }
  };
});

Meteor.publishComposite('OwnerGroups', function (ownerId = this.userId) {
  return {
    collectionName : 'OwnerGroups',
    find() {
      return Groups.find({ownerId : ownerId});
    }
  };
});
