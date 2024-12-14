const mongoose = require('mongoose');

const matchdaySchema = new mongoose.Schema({
    matches: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    }
});

module.exports = mongoose.model('Matchday', matchdaySchema);