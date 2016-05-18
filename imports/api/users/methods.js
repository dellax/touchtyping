import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { UsersSchema } from './users';

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


