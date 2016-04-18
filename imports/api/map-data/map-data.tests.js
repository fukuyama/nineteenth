/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { Factory } from 'meteor/dburles:factory';
import { chai, assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { DDP } from 'meteor/ddp-client';

if (Meteor.isServer) {
  require('./server/publications.js');

  describe('map-data', function () {
    describe('mutators', function () {
      it('builds correctly from factory', function () {
        const mapdata = Factory.create('map-data');
        assert.typeOf(mapdata, 'object');
        assert.match(mapdata.name, /MAP DATA/);
      });
    });
  });
}
