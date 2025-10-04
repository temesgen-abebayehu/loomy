const mongoose = require('mongoose');

const OrganizerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    events: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
    }],
});

module.exports = mongoose.model('Organizer', OrganizerSchema);
