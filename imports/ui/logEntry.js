import { Template } from 'meteor/templating';

import { BookingLog } from '../api/a_bookingLog.js';

import './logEntry.html';

Template.booking.events({
    'click .delete'() {
        Meteor.call('bookingLog.remove', this._id);
    },
});