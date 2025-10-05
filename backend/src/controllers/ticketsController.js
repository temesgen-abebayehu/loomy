const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { createNft, createAccount } = require('../utils/hederaService');
const QRCode = require('qrcode');

// @desc      Purchase a ticket
// @route     POST /api/events/:eventId/tickets
// @access    Private
exports.purchaseTicket = asyncHandler(async (req, res, next) => {
    // If no user is logged in, use a mock user ID for demonstration.
    const userId = req.user ? req.user.id : '605c724f961d8a001f8e8b29'; // An example valid ObjectId

    // Find the official demo event by its specific ID.
    const demoEvent = await Event.findById('68e24958f4072b4ec815e18a');

    if (!demoEvent) {
        return next(new ErrorResponse('The official demo event with ID 68e24958f4072b4ec815e18a was not found.', 500));
    }

    // For the hackathon, we'll simulate account creation and NFT minting
    const hederaAccountId = '0.0.12345'; // Simulated account
    const hederaTransactionId = `0.0.12345@1664920000.123456789`; // Simulated transaction
    const nftId = '0.0.54321'; // Simulated NFT ID

    const ticketData = {
        event: demoEvent._id, // Use the ID from the real database event
        user: userId,
        price: demoEvent.price, // Use the price from the real database event
        hederaAccountId,
        hederaTransactionId,
        nftId,
    };

    const ticket = await Ticket.create(ticketData);

    // Generate QR code
    const qrCodeData = JSON.stringify({
        ticketId: ticket._id,
        eventId: ticket.event,
        userId: ticket.user,
        nftId: ticket.nftId,
    });

    const qrCode = await QRCode.toDataURL(qrCodeData);

    ticket.qrCode = qrCode;
    await ticket.save();

    res.status(201).json({
        success: true,
        data: ticket,
    });
});

// @desc      Get all tickets for a user
// @route     GET /api/tickets
// @access    Private
exports.getTickets = asyncHandler(async (req, res, next) => {
    // If no user is logged in, use a mock user ID for demonstration.
    const userId = req.user ? req.user.id : '605c724f961d8a001f8e8b29'; // An example valid ObjectId
    const tickets = await Ticket.find({ user: userId }).populate('event');

    res.status(200).json({
        success: true,
        count: tickets.length,
        data: tickets,
    });
});
