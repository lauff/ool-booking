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
    'booking.add'(category) {
        check(category, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        BookingLog.insert({
            type: "sold",
            category: category,
            createdAt: new Date(),
            username: Meteor.users.findOne(this.userId).username,
            deleted: false,
        });
    },
    'booking.cancel'(id) {
        check(id, String);

        var booking = BookingLog.findOne(id);

        BookingLog.update({_id: id},{$set: {deleted: true}});

        BookingLog.insert({
            type : "cancel",
            bookingId: id,
            createdAt: new Date(),
            username: Meteor.users.findOne(this.userId).username,
        });

    },

    'booking.restore'(id) {
        check(id, String);

        var booking = BookingLog.findOne(id);

        BookingLog.update({_id: id},{$set: {deleted: false}});

        BookingLog.insert({
            type : "restore",
            bookingId: id,
            createdAt: new Date(),
            username: Meteor.users.findOne(this.userId).username,
        });

    },

    'bookingLog.remove'(taskId) {
        check(taskId, String);

        BookingLog.remove(taskId);
    },

});