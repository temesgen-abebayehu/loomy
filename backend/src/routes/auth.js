const express = require('express');
const {
    register,
    login,
    getMe,
} = require('../controllers/authController');

const router = express.Router();

const { protect } = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;
