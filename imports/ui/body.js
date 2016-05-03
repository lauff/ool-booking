import { Template } from 'meteor/templating';

import { BookingLog } from '../api/a_booking.js';

import './logEntry';
import './bookingLog';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('log');
});

Template.body.helpers({
    log() {
        return BookingLog.find({type: "sold"}, { sort: { createdAt: -1 } });
    },
    remainingCategory1() {
        return 80-BookingLog.find( {$and: [{category: "Kategorie 1"}, {type: "sold"}, {deleted: false}]}).count();
    },
    remainingCategory2() {
        return 180-BookingLog.find( {$and: [{category: "Kategorie 2"}, {type: "sold"}, {deleted: false}]}).count();
    },
    remainingCategory3() {
        return 40-BookingLog.find( {$and: [{category: "Empore"}, {type: "sold"}, {deleted: false}]}).count();
    },
});

Template.body.events({

    'click #bookingCategory1'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Insert a task into the collection
        Meteor.call('booking.add', "Kategorie 1");
    },

    'click #bookingCategory2'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Insert a task into the collection
        Meteor.call('booking.add', "Kategorie 2");
    },

    'click #bookingCategory3'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Insert a task into the collection
        Meteor.call('booking.add', "Empore");
    },


    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Meteor.call('bookingLog.insert', text);

        // Clear form
        target.text.value = '';
    },
});