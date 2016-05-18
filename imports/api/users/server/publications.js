import { Meteor } from 'meteor/meteor';

Meteor.publish("users.data", function () {
    return Meteor.users.find({}, {
    	fields: { 'points': 1, 'defaultModel': 1 } 
    });
});