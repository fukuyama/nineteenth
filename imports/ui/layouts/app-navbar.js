import { $ } from 'meteor/jquery';

import './app-navbar.jade';

$(document).on('shown.bs.collapse', '.navbar-collapse', () => {
  if (app) {
    app.fitScreen();
  }
});

$(document).on('hidden.bs.collapse', '.navbar-collapse', () => {
  if (app) {
    app.fitScreen();
  }
});
