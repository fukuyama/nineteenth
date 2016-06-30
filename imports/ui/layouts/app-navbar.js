import { $ } from 'meteor/jquery';

import './app-navbar.jade';

import { BattleApp } from '/imports/ui/phina/BattleApp.js';

$(document).on('shown.bs.collapse', '.navbar-collapse', () => {
  if (typeof BattleApp.app != "undefined") {
    BattleApp.app.fitScreen();
  }
});

$(document).on('hidden.bs.collapse', '.navbar-collapse', () => {
  if (typeof BattleApp.app != "undefined") {
    BattleApp.app.fitScreen();
  }
});
