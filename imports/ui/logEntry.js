import { Template } from 'meteor/templating';

import { BookingLog } from '../api/a_booking.js';

import './logEntry.html';

Template.booking.helpers({
    text() {
        return this.category;
    }
})

Template.booking.events({
    'click .delete'() {
        Meteor.call('booking.cancel', this._id);
    },
    'click .restore'() {
        Meteor.call('booking.restore', this._id);
    },
});

Template.registerHelper("prettifyDate", function(timestamp) {
    //return new Date(timestamp).toString('dd.MM.yyyy');
    moment.locale('de');
    return moment(new Date(timestamp)).fromNow();
});