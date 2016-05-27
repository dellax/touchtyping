import { Meteor } from 'meteor/meteor';

Meteor.publish("users.data", function () {
    return Meteor.users.find({}, {
    	fields: { 'username': 1, 'points': 1, 'defaultModel': 1 } 
    });
});