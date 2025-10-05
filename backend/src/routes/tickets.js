const router = require('express').Router({ mergeParams: true });
const { purchaseTicket, getTickets } = require('../controllers/ticketsController');
const { protect } = require('../middlewares/auth');

router.route('/').post(purchaseTicket).get(getTickets);

module.exports = router;
