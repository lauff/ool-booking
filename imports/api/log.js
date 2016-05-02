import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Log = new Mongo.Collection('log');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('log', function tasksPublication() {
        return Log.find();
    });
}

Meteor.methods({
    'tasks.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Log.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'tasks.remove'(taskId) {
        check(taskId, String);

        Log.remove(taskId);
    },
    'tasks.setChecked'(taskId, setChecked) {
        check(taskId, String);
        check(setChecked, Boolean);

        Log.update(taskId, { $set: { checked: setChecked } });
    },
});