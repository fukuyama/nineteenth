import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { AllMapData } from '/imports/api/map-data/map-data.js';
import { JoinBattles } from '/imports/api/battles/battles.js';
import { OwnerGroups } from '/imports/api/groups/groups.js';

import { addBattle, addGroupToBattle } from '/imports/api/battles/methods.js';

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
    return JoinBattles.find({
      joinUsersId : Meteor.userId()
    },{sort: {createdAt: 1}});
  }
});

Template.battle_list_item.helpers({
  ownerGroups() {
    return OwnerGroups.find({ownerId : Meteor.userId()},{sort: {createdAt: 1}});
  },
  isJoinedGorup() {
    return false;
  }
});

Template.battles.events({
  'submit .add_battle': function (event) {
    event.preventDefault();
    const mapdata = {
      name  : event.target.name.value,
      mapId : event.target.mapId.value
    };
    addBattle.call(mapdata, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
      FlowRouter.go('/battles');
    });
  }
});

Template.battle_list_item.events({
  'change .select_group': function (event) {
    event.preventDefault();
    const groupId = event.target.value
    if (groupId == '-') {
      return
    }
    console.log('change group', groupId);
    addGroupToBattle.call({
      id      : this._id,
      groupId : groupId
    }, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
    });
  }
});
