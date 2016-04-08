import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { OwnerCharacters, GroupCharacters } from '/imports/api/characters/characters.js';
import { Groups } from '/imports/api/groups/groups.js';

import { deleteGroup, addMemberToGroup, deleteMemberToGroup } from '/imports/api/groups/methods.js';

import './group.jade';

FlowRouter.route('/groups/:groupId', {
  name   : 'group_view',
  subscriptions({groupId}) {
    this.register('Groups', Meteor.subscribe('Groups', groupId));
    this.register('GroupCharacters', Meteor.subscribe('GroupCharacters', groupId));
  },
  action(param) {
    BlazeLayout.render('main', {
      content : 'group_view',
      param   : param
    });
  }
});

Template.group_view.helpers({
  group() {
    return Groups.findOne({_id : this.groupId});
  }
});

Template.group.helpers({
  isOwner() {
    return this.ownerId == Meteor.userId();
  },
  members() {
    return GroupCharacters.find({
      groupId : this._id
    });
  },
  characters() {
    return OwnerCharacters.find({
      ownerId : Meteor.userId(),
      groupId : {$ne : this._id}
    });
  }
});

Template.group.events({
  'click .delete-group' : function (event) {
    event.preventDefault();
    deleteGroup.call({
      id : this._id
    }, (err, res) => {
      if (err) {
        console.log(err);
        return
      }
      FlowRouter.go('/groups');
    });
  },
  'click .add-member' : function (event) {
    event.preventDefault();
    const data = Template.currentData();
    addMemberToGroup.call({
      characterId : this._id,
      groupId     : data._id
    });
  },
  'click .delete-member' : function (event) {
    event.preventDefault();
    deleteMemberToGroup.call({
      characterId : this._id
    });
  }
});
