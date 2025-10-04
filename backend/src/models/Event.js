const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an event name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    date: {
        type: Date,
        required: [true, 'Please add a date'],
    },
    location: {
        type: String,
        required: [true, 'Please add a location'],
    },
    image: {
        type: String,
        default: 'no-photo.jpg',
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Event', EventSchema);
