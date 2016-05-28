import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UsersSchema } from './users';
import { Notifications } from '../notifications/notifications.js';

export const setDefaultModel = new ValidatedMethod({
  name: 'users.setDefaultModel',
  validate: new SimpleSchema({
    modelId: { type: String }
  }).validator(),
  run({ modelId }) {
    	
    Meteor.users.update(Meteor.userId(), {
      $set: { defaultModel: modelId }
    });
    
  }
});

export const addPointsLection = new ValidatedMethod({
  name: 'users.addPointsLection',
  validate: new SimpleSchema({
    pointsLection: { type: Number }
  }).validator(),
  run({ pointsLection }) {
    // add points first  
    Meteor.users.update(this.userId, {
      $inc: { pointsLection }
    });
    // then notify user
    const notification = {
      userId: this.userId,
      name: 'Získal si body',
      read: false,
      text: `Gratulujeme, za splnenie lekcie si získal ${pointsLection} bodov`
    }
    Notifications.insert(notification);
  }
});

export const addPointsLections = new ValidatedMethod({
  name: 'users.addPointsLections',
  validate: new SimpleSchema({
    pointsLections: { type: Number }
  }).validator(),
  run({ pointsLections }) {
    // add points first  
    Meteor.users.update(this.userId, {
      $inc: { pointsLections }
    });
    // then notify user
    const notification = {
      userId: this.userId,
      name: 'Získal si body',
      read: false,
      text: `Gratulujeme, za splnenie cvičenia si získal ${pointsLections} bodov`
    }
    Notifications.insert(notification);
  }
});

export const addPointsGames = new ValidatedMethod({
  name: 'users.addPointsGames',
  validate: new SimpleSchema({
    pointsGames: { type: Number }
  }).validator(),
  run({ pointsLection }) {
    // add points first  
    Meteor.users.update(this.userId, {
      $inc: { pointsGames }
    });
    // then notify user
    const notification = {
      userId: this.userId,
      name: 'Získal si body',
      read: false,
      text: `Gratulujeme, za splnenie lekcie si získal ${pointsGames} bodov`
    }
    Notifications.insert(notification);
  }
});
