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

let app = undefined;

Template.battle.onRendered( function () {
  console.log('Template.battle.onRendered');
  this.autorun( () => {
    FlowRouter.subsReady('Battles',function () {
      const battleId = FlowRouter.getParam('battleId');
      const battle = Battles.findOne({_id : battleId});
      app = BattleApp({
        mapId : battle.mapId,
        mapx  : 0,
        mapy  : 0
      });
      app.run();
    });
  });
});

Template.battle.onDestroyed( function () {
  console.log('Template.battle.onDestroyed');
  if (app) {
    app.flare('destroyed',{app : app});
    app = undefined;
  }
});

$(document).on('mouseout', '.battle-canvas', function () {
  console.log('mouseout.battle-canvas');
  if (app) {
    app.flare('canvas.mouseout',{app : app});
  }
});
