import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from 'meteor/templating';

import { addGroup } from '/imports/api/groups/methods.js';

import './add_group.jade';

FlowRouter.route('/add_group', {
  name : 'add group',
  action() {
    BlazeLayout.render('main',{content : 'add_group'});
  }
});

Template.add_group.events({
  'submit .add_group' (event) {
    event.preventDefault();
    addGroup.call({
      name : event.target.name.value
    }, (err,res) => {
      if (err) {
        console.log(err);
        return
      }
      FlowRouter.go('/groups');
    });
  }
});
