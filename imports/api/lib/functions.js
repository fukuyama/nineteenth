import { Meteor } from 'meteor/meteor';

export const authorizedUserId = function () {
  const userId = Meteor.userId();
  if (!userId) {
    throw new Meteor.Error('not-authorized');
  }
  return userId;
};
