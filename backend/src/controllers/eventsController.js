const Event = require('../models/Event');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc      Get all events
// @route     GET /api/events
// @access    Public
exports.getEvents = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get single event
// @route     GET /api/events/:id
// @access    Public
exports.getEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
        );
    }

    res.status(200).json({ success: true, data: event });
});

// @desc      Create new event
// @route     POST /api/events
// @access    Private
exports.createEvent = asyncHandler(async (req, res, next) => {
    req.body.organizer = req.user.id;

    const event = await Event.create(req.body);

    res.status(201).json({
        success: true,
        data: event,
    });
});

// @desc      Update event
// @route     PUT /api/events/:id
// @access    Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
    let event = await Event.findById(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is event owner
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to update this event`,
                401
            )
        );
    }

    event = await Event.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({ success: true, data: event });
});

// @desc      Delete event
// @route     DELETE /api/events/:id
// @access    Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
        return next(
            new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is event owner
    if (event.organizer.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.user.id} is not authorized to delete this event`,
                401
            )
        );
    }

    event.remove();

    res.status(200).json({ success: true, data: {} });
});
