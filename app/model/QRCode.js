const mongoose = require('mongoose');

const QRCodeSchema = mongoose.Schema({

    date: {
        type: Date,
        default: Date.now
    },
    qrurl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('QRCode', QRCodeSchema);