const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Event = require('./src/models/Event');

// Load env vars
dotenv.config({ path: './.env' });

const createEvent = async () => {
    try {
        await connectDB();

        const eventName = 'Official Demo Event';
        let event = await Event.findOne({ name: eventName });

        if (event) {
            console.log('Demo event already exists.');
        } else {
            event = await Event.create({
                name: eventName,
                description: 'This is the official event for the hackathon demonstration. All tickets will be created for this event.',
                date: new Date('2025-12-01T19:00:00.000Z'),
                location: 'Virtual',
                image: '/tech-conference.jpg',
                price: 50,
                category: 'Tech',
                organizer: '605c724f961d8a001f8e8b29' // Using the same mock user ID as an organizer
            });
            console.log('Official Demo Event created successfully!');
        }

        mongoose.connection.close();
        process.exit();
    } catch (error) {
        console.error('Error creating demo event:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

createEvent();
