import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { CharacterTypes } from '/imports/api/character-types/character-types.js';

import { addCharacter } from '/imports/api/characters/methods.js';

import './add_character.jade';

FlowRouter.route('/add_character', {
  name   : 'add character',
  subscriptions() {
    this.register('CharacterTypes', Meteor.subscribe('CharacterTypes'));
  },
  action : function () {
    BlazeLayout.render('main',{content : 'add_character'});
  }
});

Template.add_character.helpers({
  characterTypes : function () {
    return CharacterTypes.find({},{sort: {createdAt: -1}});
  }
});

Template.add_character.events({
  'submit .add_character': function (event) {
    event.preventDefault();
    addCharacter.call({
      name   : event.target.name.value,
      typeId : event.target.typeId.value
    }, (err, res) => {
      if (err) {
        console.log(err);
        return
      }
      FlowRouter.go('/characters');
    });
  }
});
