import { Meteor } from 'meteor/meteor';

export const errorHandler = function (fn) {
  return function (err,res) {
    if (err) {
      throw err;
    }
    if (fn) {
      fn(res);
    }
  };
};
