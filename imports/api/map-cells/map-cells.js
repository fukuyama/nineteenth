import { Mongo } from 'meteor/mongo';

export const MapCells = {
  At    : new Mongo.Collection('MapCells.At'),
  Range : new Mongo.Collection('MapCells.Range')
};
