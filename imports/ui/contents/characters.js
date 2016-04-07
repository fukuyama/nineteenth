import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { OwnerCharacters } from '/imports/api/characters/characters.js';

import './characters.jade';

FlowRouter.route('/characters',{
  name : 'characters',
  subscriptions(param) {
    //this.register('OwnerCharacters', Meteor.subscribe('OwnerCharacters'));
  },
  action() {
    BlazeLayout.render('main',{content : 'characters'});
  }
});

Template.characters.helpers({
  characters() {
    return OwnerCharacters.find({ownerId : Meteor.userId()},{sort: {createdAt: 1}});
  }
});
