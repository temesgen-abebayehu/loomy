const express = require('express');
const {
    getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventsController');

const Event = require('../models/Event');
const advancedResults = require('../middlewares/advancedResults');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router
    .route('/')
    .get(advancedResults(Event, 'organizer'), getEvents)
    .post(protect, authorize('organizer', 'admin'), createEvent);

router
    .route('/:id')
    .get(getEvent)
    .put(protect, authorize('organizer', 'admin'), updateEvent)
    .delete(protect, authorize('organizer', 'admin'), deleteEvent);

module.exports = router;
