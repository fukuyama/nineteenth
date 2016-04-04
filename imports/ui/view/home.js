
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import './home.jade';

FlowRouter.route('/',{
  name   : 'top',
  action : () => {
    BlazeLayout.render('main',{
      content : 'home'
    });
  }
});
