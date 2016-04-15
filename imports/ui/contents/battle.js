import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Battles } from '/imports/api/battles/battles.js';

import { BattleApp } from '/imports/ui/phina/BattleApp.js';

import './battle.jade';

FlowRouter.route('/battles/:battleId', {
  name : 'battles',
  subscriptions({battleId}) {
    this.register('Battles', Meteor.subscribe('Battles',battleId));
  },
  action() {
    BlazeLayout.render('main',{content : 'battle'});
  }
});

Template.battle.onRendered( function () {
  console.log('Template.battle.onRendered');
  this.autorun( () => {
    FlowRouter.subsReady('Battles',function () {
      const battleId = FlowRouter.getParam('battleId');
      const battle = Battles.findOne({_id : battleId});
      console.log('Battles ready');
      app = BattleApp();
      app.run();
    });
  });
});

Template.battle.onDestroyed( function () {
  console.log('Template.battle.onDestroyed');
  /*
  app?.flare 'destroyed'
  */
});

$(document).on('mouseout', '.battle-canvas', function () {
  console.log('mouseout.battle-canvas');
  /*
  app?.flare 'canvas.mouseout'
  */
});
