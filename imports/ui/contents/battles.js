import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';

import { AllMapData } from '/imports/api/map-data/map-data.js';
import { JoinBattles } from '/imports/api/battles/battles.js';
import { OwnerGroups } from '/imports/api/groups/groups.js';

import { addBattle, addGroupToBattle, deleteGroupToBattle } from '/imports/api/battles/methods.js';

import './battles.jade';

FlowRouter.route('/battles', {
  name : 'battles',
  subscriptions() {
    this.register('AllMapData', Meteor.subscribe('AllMapData'));
    //this.register('JoinBattles', Meteor.subscribe('JoinBattles'));
    this.register('OwnerGroups', Meteor.subscribe('OwnerGroups'));
  },
  action() {
    BlazeLayout.render('main',{content : 'battles'});
  }
});

Template.battles.onRendered(function () {
  this.subscribe('JoinBattles');
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
  'change .select_group' : function (event) {
    event.preventDefault();
    const battle  = this;
    const groupId = event.target.value
    if (groupId == '-') {
      return
    }
    if ( _.contains(battle.groupsId,groupId) ) {
      return
    }
    addGroupToBattle.call({
      id      : battle._id,
      groupId : groupId
    }, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
      //FlowRouter.reload();
      BlazeLayout.reset();
      BlazeLayout.render('main',{content : 'battles'});
      //location.reload();
      //Meteor.subscribe('JoinBattles');
    });
  },
  'click .delete_group' : function (event) {
    event.preventDefault();
    const battle = Template.parentData(0);
    const groupId = this._id;
    deleteGroupToBattle.call({
      id      : battle._id,
      groupId : groupId
    }, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
      FlowRouter.reload();
      //BlazeLayout.reset();
      //BlazeLayout.render('main',{content : 'battles'});
      //location.reload();
      //Meteor.subscribe('JoinBattles');
    });
  },
  'click .delete_battle' : function (event) {
    event.preventDefault();
    const battle  = this;
    console.log('delete battle',battle);
  }
});
