import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { Characters } from '/imports/api/characters/characters.js';

import { deleteCharacter } from '/imports/api/characters/methods.js';

import './character.jade';

FlowRouter.route('/characters/:characterId', {
  name : 'character_view',
  subscriptions({characterId}) {
    this.register('Characters', Meteor.subscribe('Characters',characterId));
  },
  action(param) {
    BlazeLayout.render('main', {
      content : 'character_view',
      param   : param
    });
  }
});

Template.character_view.helpers({
  character() {
    return Characters.findOne({_id : this.characterId});
  }
});

Template.character.helpers({
  isOwner() {
    return this.ownerId == Meteor.userId();
  }
});

Template.character.events({
  'click .delete' : function (event) {
    event.preventDefault();
    deleteCharacter.call({
      id : this._id
    }, (err, res) => {
      if (err) {
        console.log(err);
        return
      }
      FlowRouter.go('/characters');
    });
  }
});
