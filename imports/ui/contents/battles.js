import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

import { AllMapData } from '/imports/api/map-data/map-data.js';
import { Battles, JoinBattlesId } from '/imports/api/battles/battles.js';
import { OwnerGroups } from '/imports/api/groups/groups.js';

import { addBattle, deleteBattle, addGroupToBattle, deleteGroupToBattle } from '/imports/api/battles/methods.js';

import './battles.jade';

FlowRouter.route('/battles', {
  name : 'battles',
  subscriptions() {
    this.register('AllMapData', Meteor.subscribe('AllMapData'));
    //this.register('JoinBattles', Meteor.subscribe('JoinBattles'));
    this.register('JoinBattlesId', Meteor.subscribe('JoinBattlesId'));
    this.register('OwnerGroups', Meteor.subscribe('OwnerGroups'));
  },
  action() {
    BlazeLayout.render('main',{content : 'battles'});
  }
});

//Template.battles.onRendered(function () {
//  this.subscribe('JoinBattlesId');
//});

Template.battles.helpers({
  mapdata() {
    return AllMapData.find({},{sort: {createdAt: 1}});
  },
  battlesId() {
    return JoinBattlesId.find({},{sort: {createdAt: 1}});
  }
});

Template.battle_list_item.onRendered(function () {
  this.subscribe('Battles',this.data.battleId);
});

Template.battle_list_item.helpers({
  battle() {
    return Battles.findOne(this.battleId);
  },
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
    });
  }
});

Template.battle_list_item.events({
  'change .select_group' : function (event) {
    event.preventDefault();
    const battleId = this.battleId;
    const groupId  = event.target.value
    if (groupId == '-') {
      return
    }
    addGroupToBattle.call({
      id      : battleId,
      groupId : groupId
    }, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
    });
  },
  'click .delete_group' : function (event) {
    event.preventDefault();
    const battleId = Template.parentData(0).battleId;
    const groupId  = this._id;
    deleteGroupToBattle.call({
      id      : battleId,
      groupId : groupId
    }, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
    });
  },
  'click .delete_battle' : function (event) {
    event.preventDefault();
    console.log('delete battle',this.battleId);
    deleteBattle.call({
      id : this.battleId
    }, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
    });
  }
});
