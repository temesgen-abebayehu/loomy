const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    purchaseDate: {
        type: Date,
        default: Date.now,
    },
    hederaAccountId: {
        type: String,
    },
    hederaTransactionId: {
        type: String,
    },
    nftId: {
        type: String,
    },
    qrCode: {
        type: String,
    },
});

module.exports = mongoose.model('Ticket', TicketSchema);
