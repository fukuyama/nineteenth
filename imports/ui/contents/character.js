import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { Characters } from '/imports/api/characters/characters.js';

import './character.jade';

FlowRouter.route('/characters/:characterId', {
  name   : 'character',
  subscriptions : function (param) {
    this.register('Characters', Meteor.subscribe('Characters',param.characterId));
  },
  action : function (param) {
    BlazeLayout.render('main', {
      content : 'character_view',
      param   : param
    });
  }
});

Template.character_view.helpers({
  character : function () {
    return Characters.findOne({_id : this.characterId});
  }
});

/*
Template.character_view.onCreated ->
  self = @
  self.autorun ->
    self.subscribe 'Characters.At', self.data.characterId


Template.character.helpers
  isOwner : -> @owner is Meteor.userId()

Template.character.events
  'click .delete' : (event) ->
    Meteor.call 'deleteCharacter', id : @_id
    FlowRouter.go('/characters')
*/
