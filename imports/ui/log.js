import { Template } from 'meteor/templating';

import { Log } from '../api/log.js';

import './log.html';

Template.booking.events({
    'click .delete'() {
        Meteor.call('log.remove', this._id);
    },
});