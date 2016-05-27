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

export const addPoints = new ValidatedMethod({
  name: 'users.addPoints',
  validate: new SimpleSchema({
    points: { type: Number }
  }).validator(),
  run({ points }) {
    // add points first  
    Meteor.users.update(this.userId, {
      $inc: { points }
    });
    // then notify user
    const notification = {
      userId: this.userId,
      name: 'Získal si body',
      read: false,
      text: `Gratulujeme, za splnenie lekcie si získal ${points} bodov`
    }
    Notifications.insert(notification);
  }
});


