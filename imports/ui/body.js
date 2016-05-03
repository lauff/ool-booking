import { Template } from 'meteor/templating';

import { BookingLog } from '../api/a_bookingLog.js';

import './logEntry';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('log');
});

Template.body.helpers({
    log() {
        return BookingLog.find({}, { sort: { createdAt: -1 } });
    },
    remainingCategory1() {
        return 30-BookingLog.find({text: "Kategorie 1"}).count();
    },
    remainingCategory2() {
        return 80-BookingLog.find({text: "Kategorie 1"}).count();
    },
    remainingCategory3() {
        return 120-BookingLog.find({text: "Kategorie 1"}).count();
    },
});

Template.body.events({

    'click #bookingCategory1'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Insert a task into the collection
        Meteor.call('bookingLog.insert', "Kategorie 1");
    },

    'click #bookingCategory2'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Insert a task into the collection
        Meteor.call('bookingLog.insert', "Kategorie 2");
    },

    'click #bookingCategory3'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Insert a task into the collection
        Meteor.call('bookingLog.insert', "Kategorie 3");
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