import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { OwnerGroups } from '/imports/api/groups/groups.js';

import './battle.jade';

FlowRouter.route('/battle', {
  name : 'battle',
  action() {
    BlazeLayout.render('main',{content : 'battle'});
  }
});

Template.battle.onRendered( function () {
  console.log('Template.battle.onRendered');

  this.autorun( () => {
  });

  /*
  ins = @
  ins.autorun ->
    ins.subscribe 'Groups.Owner',
      onReady : ->
        startBattle
          mapid : 1
          mapx  : 0
          mapy  : 0
          groups : for group in Groups.Owner.find().fetch() then group._id
  */
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
