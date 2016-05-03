import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const BookingLog = new Mongo.Collection('bookingLog');

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('log', function tasksPublication() {
        return BookingLog.find();
    });
}

Meteor.methods({
    'bookingLog.insert'(text) {
        check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        BookingLog.insert({
            text: text,
            createdAt: new Date(),
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'bookingLog.remove'(taskId) {
        check(taskId, String);

        BookingLog.remove(taskId);
    },
});