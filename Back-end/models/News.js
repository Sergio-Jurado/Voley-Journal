const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    League: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League'
    },
    createdBy: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('News', newSchema);