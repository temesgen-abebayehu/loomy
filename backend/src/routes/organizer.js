const express = require('express');
const {
    getOrganizerDashboard,
} = require('../controllers/organizerController');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

router.get('/dashboard', protect, authorize('organizer'), getOrganizerDashboard);

module.exports = router;
