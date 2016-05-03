import { Template } from 'meteor/templating';

import { BookingLog } from '../api/log.js';

import './log.html';

Template.booking.events({
    'click .delete'() {
        Meteor.call('log.remove', this._id);
    },
});