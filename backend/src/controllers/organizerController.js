const Organizer = require('../models/Organizer');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

// @desc      Get organizer dashboard
// @route     GET /api/organizer/dashboard
// @access    Private/Organizer
exports.getOrganizerDashboard = asyncHandler(async (req, res, next) => {
    const organizer = await Organizer.findOne({ user: req.user.id }).populate('events');
    if (!organizer) {
        return next(new ErrorResponse('Organizer not found', 404));
    }
    res.status(200).json({ success: true, data: organizer });
});
