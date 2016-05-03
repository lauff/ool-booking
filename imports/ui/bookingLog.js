import { Template } from 'meteor/templating';

import { BookingLog } from '../api/a_booking.js';

import './bookingLog.html';



Template.bookingLog.helpers({
    log() {
        return BookingLog.find(
            {$and: [ {$or: [{type: "cancel"}, {type: "restore"}]} ,{bookingId: this._id}]}
            , { sort: { createdAt: 0 } });
    },
});


Template.bookingLogEntry.helpers({
    text() {
        if (this.type=="cancel") return "storniert";
        else return "wiederhergestellt";
    }
})

Template.bookingLog.events({
});
