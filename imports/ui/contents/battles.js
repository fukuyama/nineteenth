import { Meteor }      from 'meteor/meteor';
import { FlowRouter }  from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template }    from 'meteor/templating';
import { _ }           from 'meteor/underscore';

import { AllMapData }  from '/imports/api/map-data/map-data.js';
import { JoinBattles } from '/imports/api/battles/battles.js';
import { OwnerGroups } from '/imports/api/groups/groups.js';

import {
  addBattle,
  deleteBattle,
  addGroupToBattle,
  deleteGroupToBattle } from '/imports/api/battles/methods.js';
import { errorHandler } from '/imports/ui/lib/functions.js';

import './battles.jade';

FlowRouter.route('/battles', {
  name : 'battles',
  subscriptions() {
    this.register('AllMapData', Meteor.subscribe('AllMapData'));
    this.register('JoinBattles', Meteor.subscribe('JoinBattles'));
    this.register('OwnerGroups', Meteor.subscribe('OwnerGroups'));
  },
  action() {
    BlazeLayout.render('main',{content : 'battles'});
  }
});

Template.battles.helpers({
  mapdata() {
    return AllMapData.find({},{sort: {createdAt: 1}});
  },
  battles() {
    return JoinBattles.find({},{sort: {createdAt: 1}});
  }
});

Template.battle_list_item.helpers({
  ownerGroups() {
    return OwnerGroups.find({},{sort: {createdAt: 1}});
  }
});

Template.battles.events({
  'submit .add_battle': function (event) {
    event.preventDefault();
    const param = {
      name  : event.target.name.value,
      mapId : event.target.mapId.value
    };
    addBattle.call(param, errorHandler());
  }
});

Template.battle_list_item.events({
  'click .add_group' : function (event) {
    event.preventDefault();
    const battleId = Template.parentData(0)._id;
    const groupId  = this._id;
    const param = {
      id      : battleId,
      groupId : groupId
    };
    addGroupToBattle.call(param, errorHandler());
  },
  'click .delete_group' : function (event) {
    event.preventDefault();
    const battleId = Template.parentData(0)._id;
    const groupId  = this._id;
    const param = {
      id      : battleId,
      groupId : groupId
    };
    deleteGroupToBattle.call(param, errorHandler());
  },
  'click .delete_battle' : function (event) {
    event.preventDefault();
    const battleId = this._id;
    const param = {
      id : battleId
    };
    deleteBattle.call(param, errorHandler());
  }
});
