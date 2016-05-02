import { Template } from 'meteor/templating';

import { Log } from '../api/log.js';

import './log';
import './body.html';


Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('log');
});

Template.body.helpers({
    log() {
        return Log.find({}, { sort: { createdAt: -1 } });
    },
});

Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
        Meteor.call('log.insert', text);

        // Clear form
        target.text.value = '';
    },
});