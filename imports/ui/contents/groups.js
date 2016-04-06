import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { OwnerGroups } from '/imports/api/groups/groups.js';

import './groups.jade';

FlowRouter.route('/groups', {
  name   : 'groups',
  subscriptions(param) {
    this.register('OwnerGroups', Meteor.subscribe('OwnerGroups'));
  },
  action() {
    BlazeLayout.render('main',{content : 'groups'});
  }
});

Template.groups.helpers({
  groups() {
    OwnerGroups.find({owner : this.userId()},{sort: {createdAt: 1}});
  }
});
